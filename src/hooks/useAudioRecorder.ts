import { useState, useEffect, useRef } from "react";

export const useAudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);

    // 初始化录音
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
            };

            mediaRecorder.start();
            setIsRecording(true);
            setError(null);
        } catch (err) {
            setError("无法访问麦克风，请检查权限或硬件。");
            console.error("录音错误:", err);
        }
    };

    // 停止录音
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            streamRef.current?.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    // 回放录音
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playRecording = () => {
        if (!audioURL) return;

        if (!isPlaying) {
            const audio = new Audio(audioURL);
            audioRef.current = audio; // 存储当前音频实例
            audio.play().catch(err => {
                setError("回放失败，请重试。");
                setIsPlaying(false);
            });
            setIsPlaying(true);
            audio.onended = () => setIsPlaying(false);
            audio.onpause = () => setIsPlaying(false);
        } else {
            audioRef.current?.pause(); // 使用存储的实例暂停
            setIsPlaying(false);
        }
    };

    // 清理
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioURL) {
                URL.revokeObjectURL(audioURL);
            }
        };
    }, [audioURL]);

    return { isRecording, audioURL, error, startRecording, stopRecording, playRecording, isPlaying };
};