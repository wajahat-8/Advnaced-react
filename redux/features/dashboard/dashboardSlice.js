import { createSlice } from "@reduxjs/toolkit";
// 1. Import the new fetchDashboardWorkouts thunk
import { getDashboardAnalytics, fetchDashboardWorkouts } from './dashboardThunk';

const initialState = {
  analytics: null, 
  workoutStats: [], 
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload; 
      })
      .addCase(getDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDashboardWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutStats = action.payload;
      })
      .addCase(fetchDashboardWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;