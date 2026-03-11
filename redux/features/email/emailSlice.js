import { createSlice } from "@reduxjs/toolkit";
import { sendWorkoutEmail } from "./emailThunk";

const initialState = {
  loading: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  success: false,
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    resetEmailStatus: (state) => {
      state.loading = 'idle';
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendWorkoutEmail.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(sendWorkoutEmail.fulfilled, (state) => {
        state.loading = 'succeeded';
        state.success = true;
      })
      .addCase(sendWorkoutEmail.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetEmailStatus } = emailSlice.actions;

export default emailSlice.reducer;