import { configureStore } from "@reduxjs/toolkit";
import ttsReducer from "./TTSSlice";
import langReducer from "./LangSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["tts", "lang"], // 持久化 tts 和 lang 状态
};

const persistedTtsReducer = persistReducer(persistConfig, ttsReducer);
const persistedLangReducer = persistReducer(persistConfig, langReducer);

export const store = configureStore({
    reducer: {
        tts: persistedTtsReducer,
        lang: persistedLangReducer,
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