import { configureStore } from "@reduxjs/toolkit";
import ttsReducer from "./TTSSlice";
import langReducer from "./LangSlice";
import listenerReducer from "./ListenChipSlice";
import wordReducer from "./WordSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const ttsPersistConfig = { key: "tts", storage };
const langPersistConfig = { key: "lang", storage };
const listenerPersistConfig = { key: "listener", storage };
const wordPersistConfig = { key: "word", storage };

const persistedTtsReducer = persistReducer(ttsPersistConfig, ttsReducer);
const persistedLangReducer = persistReducer(langPersistConfig, langReducer);
const persistedListenerReducer = persistReducer(listenerPersistConfig, listenerReducer);
const persistedWordReducer = persistReducer(wordPersistConfig, wordReducer);

export const store = configureStore({
    reducer: {
        tts: persistedTtsReducer,
        lang: persistedLangReducer,
        listener: persistedListenerReducer,
        word: persistedWordReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;