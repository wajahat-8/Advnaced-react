import { createSlice } from '@reduxjs/toolkit';
import { fetchChallengeSubmissions, submitChallengeFeedback } from './challengeSubmissionThunk';

const initialState = {
  submissions: [],
  loading: 'idle',
  error: null,
  totalSubmissions: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
};

const challengeSubmissionSlice = createSlice({
  name: 'challengeSubmissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallengeSubmissions.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchChallengeSubmissions.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.submissions = action.payload.results || [];
        state.totalSubmissions = action.payload.total || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
      })
      .addCase(fetchChallengeSubmissions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.submissions = [];
      })

      .addCase(submitChallengeFeedback.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(submitChallengeFeedback.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // const index = state.submissions.findIndex(sub => sub._id === action.payload._id);
        // if (index !== -1) {
        //   state.submissions[index] = action.payload;
        // }
      })
      .addCase(submitChallengeFeedback.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default challengeSubmissionSlice.reducer;

