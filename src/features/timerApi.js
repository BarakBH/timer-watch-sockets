import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const timerApi = createApi({
    reducerPath: 'timerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        startTimer: builder.query({
            query: () => ({
                url: '/timer/start',
                method: 'POST'
            }),
        }),
        resetTimer: builder.query({
            query: () => ({
                url: '/timer/reset',
                method: 'POST'
            }),
        }),
    }),
});

export const { useStartTimerQuery, useResetTimerQuery } = timerApi;