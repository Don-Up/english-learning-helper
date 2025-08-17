import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayState = "playing" | "looping" | "paused" | "stopped";

interface TTSState {
    selectedVoice: string; // 选中的 TTS 角色名称
    speed: number;        // 播放速度
    playState: PlayState;
    voices: string[],
}

const initialState: TTSState = {
    selectedVoice: "Microsoft Eric Online (Natural) - English (United States)", // 默认 TTS 角色
    speed: 1.0, // 默认播放速度
    playState: "stopped",
    voices: [],
};


const TTSSlice = createSlice({
    name: "tts",
    initialState,
    reducers: {
        setSelectedVoice(state, action: PayloadAction<string>) {
            state.selectedVoice = action.payload;
        },
        setSpeed(state, action: PayloadAction<number>) {
            state.speed = action.payload;
        },
        resetTTS(state) {
            state.selectedVoice = initialState.selectedVoice;
            state.speed = initialState.speed;
        },
        setPlayState(state, action: PayloadAction<PlayState>) {
            state.playState = action.payload;
        },
        setVoiceList(state, action: PayloadAction<string[]>) {
            state.voices = action.payload;
        },
    },
});

export const { setSelectedVoice, setSpeed, setPlayState, setVoiceList, resetTTS } = TTSSlice.actions;
export default TTSSlice.reducer;