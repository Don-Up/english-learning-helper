import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface ListenerState {
    chips: string[];
    playCount: number
}

const initialState: ListenerState = {
    chips: [],
    playCount: 1
}

const listenChipSlice = createSlice({
    name: "listener",
    initialState,
    reducers: {
        addListenChip(state, action: PayloadAction<string>) {
            state.chips.push(action.payload);
        },
        removeListenChip(state, action: PayloadAction<number>) {
            state.chips.splice(action.payload, 1);
        },
        setListenChips(state, action: PayloadAction<string[]>) {
            // Fix: Replace the entire array contents instead of reassigning state
            state.chips.splice(0, state.chips.length, ...action.payload);
        },
        updateListenChip(state, action: PayloadAction<{ index: number; pair: string }>) {
            const { index, pair } = action.payload;
            if (index >= 0 && index < state.chips.length) {
                state.chips[index] = pair;
            }
        },
        resetListenChips(state) {
            // Fix: Clear the array instead of reassigning to empty array
            state.chips.splice(0, state.chips.length);
        },
        setPlayCount(state, action: PayloadAction<number>) {
            state.playCount = action.payload;
        }
    },
});


export const { addListenChip, removeListenChip, setListenChips, updateListenChip, resetListenChips, setPlayCount } = listenChipSlice.actions;
export default listenChipSlice.reducer;