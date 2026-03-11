import { createSlice } from "@reduxjs/toolkit";
import { sendWorkoutNotification,sendUserCommunication } from "./notificationThunk";

const initialState = {
  loading: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  success: false,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNotificationStatus: (state) => {
      state.loading = 'idle';
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendWorkoutNotification.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(sendWorkoutNotification.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
      })
      .addCase(sendWorkoutNotification.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload; // Contains the error object from rejectWithValue
        state.success = false;
      })
      .addCase(sendUserCommunication.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(sendUserCommunication.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
      })
      .addCase(sendUserCommunication.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetNotificationStatus } = notificationSlice.actions;

export default notificationSlice.reducer;