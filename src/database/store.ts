import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { movementReducer } from "./slices/movement.slice";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { themeReducer } from "./slices/theme.slice";
import sessionStorage from "redux-persist/es/storage/session";

const persistThemeConfig = {
  key: 'theme',
  storage: sessionStorage,
}

const reducers = combineReducers({
  theme: persistReducer(persistThemeConfig, themeReducer),
  movement: movementReducer,
});

export const store = () => {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  });
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];