import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice';
import { timerApi } from './timerApi';

export const store = configureStore({
    reducer: {
        timer: timerReducer,
        [timerApi.reducerPath]: timerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(timerApi.middleware),
});