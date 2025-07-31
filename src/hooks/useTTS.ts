import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedVoice, setSpeed } from "@/store/TTSSlice";
import _ from 'lodash';

export interface Voice {
    name: string;
    lang: string;
}

export const useTTS = () => {
    const dispatch = useAppDispatch();
    const { selectedVoice, speed } = useAppSelector(state => state.tts);
    const [voices, setVoices] = useState<Voice[]>([]);
    const [isReady, setIsReady] = useState(false);

    // 获取浏览器支持的语音列表并设置默认语音
    useEffect(() => {
        const loadVoices = () => {
            const synth = window.speechSynthesis;
            const availableVoices = synth.getVoices()
                .filter(voice => voice.lang.startsWith("en"));
            const voiceList = availableVoices.map(voice => ({
                name: voice.name,
                lang: voice.lang
            }));
            setVoices(voiceList);

            if (voiceList.length > 0 && (!selectedVoice || !voiceList.some(voice => voice.name === selectedVoice))) {
                dispatch(setSelectedVoice(voiceList[0].name));
            }
            setIsReady(true);
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [dispatch, selectedVoice]);

    const playText = _.throttle((text: string, onPlayEnd?: () => void) => {
        if (!isReady || !selectedVoice || !text) return;

        const synth = window.speechSynthesis;
        synth.cancel(); // 取消之前的播放
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = window.speechSynthesis.getVoices().find(v => v.name === selectedVoice);

        if (voice) {
            utterance.voice = voice;
            utterance.rate = speed;
            synth.speak(utterance);
            utterance.onend = () => {
                onPlayEnd?.();
            };
        }
    }, 1000);

    const loopText = (text: string, onLoopEnd?: () => void) => {
        if (!isReady || !selectedVoice || !text) return;

        let isLooping = true;
        const synth = window.speechSynthesis;

        const playNext = () => {
            if (!isLooping || !isReady || !selectedVoice) return;

            synth.cancel(); // 取消之前的播放
            const utterance = new SpeechSynthesisUtterance(text);
            const voice = window.speechSynthesis.getVoices().find(v => v.name === selectedVoice);

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
            onLoopEnd?.();
        };
    };

    const stopPlay = () => {
        window.speechSynthesis.cancel();
    };

    const setVoice = (voiceName: string) => {
        if (voices.some(voice => voice.name === voiceName)) {
            dispatch(setSelectedVoice(voiceName));
        }
    };

    const setPlaybackSpeed = (newSpeed: number) => {
        dispatch(setSpeed(newSpeed));
    };

    return { playText, loopText, stopPlay, setVoice, setPlaybackSpeed, voices, selectedVoice, speed, isReady };
};