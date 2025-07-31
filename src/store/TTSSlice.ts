import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TTSState {
    selectedVoice: string; // 选中的 TTS 角色名称
    speed: number;        // 播放速度
}

const initialState: TTSState = {
    selectedVoice: "Microsoft Mark - English (United States) (en-US)", // 默认 TTS 角色
    speed: 1.0, // 默认播放速度
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
    },
});

export const { setSelectedVoice, setSpeed, resetTTS } = TTSSlice.actions;
export default TTSSlice.reducer;