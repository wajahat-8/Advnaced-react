import { createSlice } from '@reduxjs/toolkit';
import { fetchChallenges, createChallenge, updateChallenge } from './challengeThunk';

const initialState = {
  challenges: [],
  loading: 'idle',
  error: null, 
  success: false,
  totalChallenges: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
};

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    clearChallengeError: (state) => {
        state.error = null;
    },
    resetChallengeStatus: (state) => {
        state.loading = 'idle';
        state.success = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.challenges = action.payload.challenges;
        state.totalChallenges = action.payload.totalChallenges;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload?.message || 'Failed to fetch challenges.';
        state.challenges = []; 
      })
      .addCase(createChallenge.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(createChallenge.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
        state.challenges.unshift(action.payload.data);
        state.totalChallenges += 1;
      })
      .addCase(createChallenge.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload?.message || 'Failed to create challenge.';
      })
      .addCase(updateChallenge.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(updateChallenge.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
      })
      .addCase(updateChallenge.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload?.message || action.payload || 'Failed to update challenge.';
      });
  },
});

export const { clearChallengeError, resetChallengeStatus } = challengeSlice.actions;
export default challengeSlice.reducer;