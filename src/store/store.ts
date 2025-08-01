import { configureStore } from "@reduxjs/toolkit";
import ttsReducer from "./TTSSlice";
import langReducer from "./LangSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const ttsPersistConfig = { key: "tts", storage };
// const langPersistConfig = { key: "lang", storage, };

// const persistedTtsReducer = persistReducer(ttsPersistConfig, ttsReducer);
// const persistedLangReducer = persistReducer(langPersistConfig, langReducer);

export const store = configureStore({
    reducer: {
        tts: ttsReducer,
        lang: langReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    //         },
    //     }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;