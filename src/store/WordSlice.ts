import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WordState {
    words: string[]
    isMasked: boolean
}

const initialState: WordState = {
    words: [],
    isMasked: true
}

export const wordSlice = createSlice({
    name: 'word',
    initialState,
    reducers: {
        setWords: (state, action: PayloadAction<string[]>) => {
            state.words = action.payload
            state.isMasked = true
        },
        appendWords: (state, action: PayloadAction<string[]>) => {
            state.words = [...state.words, ...action.payload]
            state.isMasked = true
        },
        toggleMask: (state, action: PayloadAction<boolean>) => {
            state.isMasked = action.payload
        },
        moveToEnd: (state) => {
            if (state.words.length > 0) {
                const [first, ...rest] = state.words
                state.words = [...rest, first]
                state.isMasked = true
            }
        },
        removeFirst: (state) => {
            if (state.words.length > 0) {
                state.words = state.words.slice(1)
                state.isMasked = true
            }
        }
    }
})

export const { setWords, appendWords, toggleMask, moveToEnd, removeFirst } = wordSlice.actions
export default wordSlice.reducer