import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoryRankings, assignDivision,markAsGrandFinalist } from './rankingThunk';

const initialState = {
  rankings: [],
  loading: 'idle',
  error: null,
  success: false, 
  totalPages: 0,
  totalRankings: 0,
  currentPage: 1,
  limit: 100,
};

const rankingSlice = createSlice({
  name: 'rankings',
  initialState,
  reducers: {
    resetRankingStatus: (state) => {
        state.loading = 'idle';
        state.success = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryRankings.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchCategoryRankings.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.rankings = action.payload.rankings || [];
        state.totalRankings = action.payload.totalPage || 0;
        state.totalPages = action.payload.totalPage || 0;
        state.currentPage = action.payload.page;
        // state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchCategoryRankings.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.rankings = [];
      })
      // --- Cases for Assigning a Division ---
      .addCase(assignDivision.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(assignDivision.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
        
        // const { updatedIds, newDivision } = action.payload;
        
        // state.rankings = state.rankings.map(athlete => {
        //   if (updatedIds.includes(athlete._id)) {
        //     return { ...athlete, suggestedDivision: newDivision };
        //   }
        //   return athlete;
        // });
      })
      .addCase(assignDivision.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload;
      })
      .addCase(markAsGrandFinalist.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(markAsGrandFinalist.fulfilled, (state) => {
        state.loading = 'succeeded';
        state.success = true;
      })
      .addCase(markAsGrandFinalist.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetRankingStatus } = rankingSlice.actions;
export default rankingSlice.reducer;