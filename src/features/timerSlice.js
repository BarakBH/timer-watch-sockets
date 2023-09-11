import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        value: 60,
    },
    reducers: {
        setTimer: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setTimer } = timerSlice.actions;
export const selectTimer = (state) => state.timer.value;
export default timerSlice.reducer;