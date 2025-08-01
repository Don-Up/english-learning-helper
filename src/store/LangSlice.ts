import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LangPair {
    lang1Text: string;
    lang2Text: string;
}

interface LangState {
    list: LangPair[];
}

const initialState: LangState = {
    list: [{
        lang1Text: "Wish you a pleasant study!",
        lang2Text: "祝你学习愉快！",
    }],
};

const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        addLangPair(state, action: PayloadAction<LangPair>) {
            state.list.push(action.payload);
        },
        removeLangPair(state, action: PayloadAction<number>) {
            state.list.splice(action.payload, 1);
        },
        setLangList(state, action: PayloadAction<LangPair[]>) {
            state.list = action.payload;
        },
        updateLangPair(state, action: PayloadAction<{ index: number; pair: LangPair }>) {
            const { index, pair } = action.payload;
            if (index >= 0 && index < state.list.length) {
                state.list[index] = pair;
            }
        },
        resetLangList(state) {
            state.list = [];
        },
    },
});

export const { addLangPair, removeLangPair, setLangList, updateLangPair, resetLangList } = langSlice.actions;
export default langSlice.reducer;