import React, {useEffect} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {useTTS, Voice} from "@/hooks/useTTS";

const TTSVoiceSelect: React.FC = () => {
    const { playText, setVoice, setPlaybackSpeed, voices, selectedVoice, isReady } = useTTS();

    // 处理语音选择
    const handleVoiceChange = (value: string) => {
        setVoice(value);
    };

    // 测试选中的语音
    const testVoice = () => {
        playText(`Hello, this is a test`);
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="flex-1 text-gray-100">
                <Select value={selectedVoice || ''} onValueChange={handleVoiceChange} disabled={!isReady}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="选择TTS语音角色" />
                    </SelectTrigger>
                    <SelectContent>
                        {voices.length === 0 ? (
                            <SelectItem value="loading" disabled>
                                加载语音中...
                            </SelectItem>
                        ) : (
                            voices.map((voice: string) => (
                                <SelectItem key={voice} value={voice}>
                                    {voice}
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
            </div>
            <Button
                onClick={testVoice}
                disabled={!selectedVoice || !isReady}
                className="px-4 py-2"
            >
                Test Voice
            </Button>
        </div>
    );
};

export default TTSVoiceSelect;