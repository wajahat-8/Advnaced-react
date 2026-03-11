import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 1. Define the UI State
export interface CounterState {
    value: number;
}

// 2. Initial Data
const initialState: CounterState = {
    value: 0
};

// 3. The Slice (Handles State Logic)
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Immer lets us mutate state directly without the spread operator!
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
});

// 4. Export the actions (to be used in components)
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 5. Export the reducer (to be wired to the store)
export default counterSlice.reducer;
