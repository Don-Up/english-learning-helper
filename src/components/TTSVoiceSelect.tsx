import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Voice {
    name: string;
    lang: string;
}

const TTSVoiceSelect: React.FC = () => {
    const [voices, setVoices] = useState<Voice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<string>('');

    // 获取浏览器支持的语音列表
    useEffect(() => {
        const loadVoices = () => {
            const synth = window.speechSynthesis;
            const availableVoices = synth.getVoices();
            setVoices(availableVoices.map(voice => ({
                name: voice.name,
                lang: voice.lang
            })));

            // 如果有语音可用，设置默认选择第一个
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0].name);
            }
        };

        // 语音列表可能需要时间加载，添加事件监听
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        // 清理事件监听
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // 处理语音选择
    const handleVoiceChange = (value: string) => {
        setSelectedVoice(value);
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
            synth.speak(utterance);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="flex-1 text-gray-100">
                <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择TTS语音角色"/>
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