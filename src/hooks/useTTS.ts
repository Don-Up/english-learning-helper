import {useEffect, useRef, useState} from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {setPlayState, setSelectedVoice, setSpeed, setVoiceList} from "@/store/TTSSlice";
import _ from 'lodash';

export interface Voice {
    name: string;
    lang: string;
}


export const useTTS = () => {
    const dispatch = useAppDispatch();
    const { selectedVoice, speed, playState, voices, random } = useAppSelector(state => state.tts);
    const [isReady, setIsReady] = useState(false);
    const isLoop = useRef( false)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyS':
                    stopPlay();
                    break;
                case 'KeyD':
                    pausePlay()
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // 获取浏览器支持的语音列表并设置默认语音
    useEffect(() => {
        const loadVoices = () => {
            const synth = window.speechSynthesis;
            const availableVoices = synth.getVoices()
                .filter(voice => voice.lang.startsWith("en"));
            // availableVoices.forEach(voice => {
            //     console.log(voice.name)
            // });
            const voiceList = availableVoices.map(voice => ({
                name: voice.name,
                lang: voice.lang
            }));
            dispatch(setVoiceList(voiceList.map(voice => voice.name)));
            if (voiceList.length > 0 && (!selectedVoice || !voiceList.some(voice => voice.name === selectedVoice))) {
                dispatch(setSelectedVoice(voiceList[0].name));
            }
            setIsReady(true);
        };
        loadVoices();

        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const playText = _.throttle((text: string, onPlayEnd?: () => void) => {
        if (!isReady || !selectedVoice || !text) return;
        dispatch(setPlayState("playing"))
        const synth = window.speechSynthesis;
        synth.cancel(); // 取消之前的播放
        const utterance = new SpeechSynthesisUtterance(text);

        const voices = window.speechSynthesis.getVoices()
        const voice = random ? getRandomVoice() : voices.find(v => v.name === selectedVoice)
        if (voice) {
            utterance.voice = voice;
            utterance.rate = speed;
            synth.speak(utterance);
            utterance.onend = () => {
                dispatch(setPlayState("stopped"))
                onPlayEnd?.();
            };
        }
    }, 1000);

    const voicesOld = [
        'Microsoft Mark - English (United States)',
        'Microsoft Zira - English (United States)',
        'Microsoft David - English (United States)',
        'Microsoft Ana Online (Natural) - English (United States)'
    ]

    const getRandomVoice = () =>  {
        const voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.startsWith("en") && !voicesOld.includes(voice.name))
        return voices[Math.floor(Math.random() * voices.length)]
    }

    const loopText = (text: string, onLoopEnd?: () => void) => {
        if (!isReady || !selectedVoice || !text) return;
        dispatch(setPlayState("looping"))
        let isLooping = true;
        const synth = window.speechSynthesis;
        const voices = window.speechSynthesis.getVoices()
        let voice = voices.find(v => v.name === selectedVoice)

        const playNext = () => {
            if (!isLooping || !isReady || !selectedVoice) return;

            synth.cancel(); // 取消之前的播放
            const utterance = new SpeechSynthesisUtterance(text);
            if(random){
                voice = getRandomVoice()
            }
            if (voice) {
                utterance.voice = voice;
                utterance.rate = speed;
                synth.speak(utterance);
                utterance.onend = () => {
                    playNext(); // 递归调用以实现循环
                };
            }
        };

        playNext();

        // 返回停止函数
        return () => {
            isLooping = false;
            synth.cancel();
            dispatch(setPlayState("stopped"))
            onLoopEnd?.();
        };
    };

    const stopPlay = () => {
        dispatch(setPlayState("stopped"))
        window.speechSynthesis.cancel();
    };

    const pausePlay = () => {
        if(playState === "playing" || playState === "looping"){
            dispatch(setPlayState("paused"))
            isLoop.current = playState === "looping"
            window.speechSynthesis.pause();
        } else {
            dispatch(setPlayState(isLoop ? "looping" : "playing"))
            window.speechSynthesis.resume();
        }
    }

    const setVoice = (voiceName: string) => {
        if (voices.some(voice => voice === voiceName)) {
            dispatch(setSelectedVoice(voiceName));
        }
    };

    const setPlaybackSpeed = (newSpeed: number) => {
        dispatch(setSpeed(newSpeed));
    };

    return { playText, loopText, stopPlay, setVoice, setPlaybackSpeed, playState, voices, selectedVoice, speed, isReady };
};