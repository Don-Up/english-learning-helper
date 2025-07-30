import React, { useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedVoice, setSpeed } from "@/store/TTSSlice";

interface Voice {
    name: string;
    lang: string;
}

const TTSVoiceSelect: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedVoice, speed } = useAppSelector(state => state.tts);

    const [voices, setVoices] = React.useState<Voice[]>([]);

    // 获取浏览器支持的语音列表并设置默认语音
    useEffect(() => {
        const loadVoices = () => {
            const synth = window.speechSynthesis;
            const availableVoices = synth.getVoices();
            const voiceList = availableVoices.map(voice => ({
                name: voice.name,
                lang: voice.lang
            }));
            setVoices(voiceList);

            // 如果有语音可用且 selectedVoice 为空或无效，设置默认选择第一个
            if (voiceList.length > 0 && (!selectedVoice || !voiceList.some(voice => voice.name === selectedVoice))) {
                dispatch(setSelectedVoice(voiceList[0].name));
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [dispatch, selectedVoice]);

    // 处理语音选择
    const handleVoiceChange = (value: string) => {
        dispatch(setSelectedVoice(value));
    };

    // 测试选中的语音
    const testVoice = () => {
        if (!selectedVoice) return;

        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance('Hello, this is a test.');
        const selected = voices.find(voice => voice.name === selectedVoice);

        if (selected) {
            utterance.voice = window.speechSynthesis.getVoices().find(
                voice => voice.name === selectedVoice
            ) || null;
            utterance.rate = speed; // 应用当前速度
            synth.speak(utterance);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="flex-1 text-gray-100">
                <Select value={selectedVoice || ''} onValueChange={handleVoiceChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择TTS语音角色" />
                    </SelectTrigger>
                    <SelectContent>
                        {voices.length === 0 ? (
                            <SelectItem value="loading" disabled>
                                加载语音中...
                            </SelectItem>
                        ) : (
                            voices.map((voice) => (
                                <SelectItem key={voice.name} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
            </div>
            <Button
                onClick={testVoice}
                disabled={!selectedVoice}
                className="px-4 py-2"
            >
                Test Voice
            </Button>
        </div>
    );
};

export default TTSVoiceSelect;