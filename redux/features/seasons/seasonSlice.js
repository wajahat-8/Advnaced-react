import { createSlice } from "@reduxjs/toolkit"; 
import { getSeasons, createSeason, fetchSeasonDetails } from "./seasonThunk";

const seasonSlice = createSlice({
  name: 'season',
  initialState: {
    loading: false,
    success: false,
    error: null,
    seasons: [],
    seasonDetails: null, 
    createSuccess: false,
    createError: null,
  },
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.seasons = [];
      state.seasonDetails = null; 
      state.createSuccess = false;
      state.createError = null;
    },
    clearAdminStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    clearCreateStatus: (state) => {
      state.createSuccess = false;
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // getSeasons cases
      .addCase(getSeasons.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getSeasons.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.seasons = action.payload; 
        const activeSeason = action.payload.find(season => season.isActive);
        if (activeSeason) {
            localStorage.setItem('seasonId', activeSeason.id);
        } else {
        localStorage.removeItem('seasonId');
                }
      })
      .addCase(getSeasons.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.seasons = []; 
      })
      // createSeason cases
      .addCase(createSeason.pending, (state) => {
        state.loading = true;
        state.createSuccess = false;
        state.createError = null;
      })
      .addCase(createSeason.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.createError = null;
        state.seasons.push(action.payload);
      })
      .addCase(createSeason.rejected, (state, action) => {
        state.loading = false;
        state.createSuccess = false;
        state.createError = action.payload;
      })
      .addCase(fetchSeasonDetails.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchSeasonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.seasonDetails = action.payload;
      })
      .addCase(fetchSeasonDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Failed to fetch season details.";
      });
  },
});

export const { resetAdminState, clearAdminStatus, clearCreateStatus } = seasonSlice.actions;
export default seasonSlice.reducer;