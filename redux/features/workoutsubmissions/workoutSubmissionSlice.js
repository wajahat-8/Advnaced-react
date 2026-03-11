import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkoutSubmissions, submitWorkoutFeedback } from './workoutSubmissionThunk'; 

const initialState = {
  submissions: [],
  loading: 'idle',
  error: null,
  totalSubmissions: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
};

const workoutSubmissionSlice = createSlice({
  name: 'workoutSubmissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkoutSubmissions.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchWorkoutSubmissions.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.submissions = action.payload.results || [];
        state.totalSubmissions = action.payload.total || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
      })
      .addCase(fetchWorkoutSubmissions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.submissions = [];
      })
      .addCase(submitWorkoutFeedback.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(submitWorkoutFeedback.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // const index = state.submissions.findIndex(sub => (sub.id || sub._id) === (action.payload.id || action.payload._id));
        // if (index !== -1) {
        //   state.submissions[index] = action.payload;
        // }
      })
      .addCase(submitWorkoutFeedback.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default workoutSubmissionSlice.reducer;

