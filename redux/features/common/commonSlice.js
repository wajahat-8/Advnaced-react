import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchPhases, fetchWorkouts, fetchWorkoutTypes, fetchChallengeCategories,fetchActiveSeasons } from './commonThunk';

const initialState = {
  categories: [],
  categoriesLoading: 'idle',
  categoriesError: null,
  
  phases: [],
  phasesLoading: 'idle',
  phasesError: null,

  workouts: [],
  workoutsLoading: 'idle',
  workoutsError: null,

  workoutTypes: [],
  workoutTypesLoading: 'idle',
  workoutTypesError: null,

  challengeCategories: [],
  challengeCategoriesLoading: 'idle',
  challengeCategoriesError: null,

  activeSeasons: [],
  activeSeasonsLoading: 'idle',
  activeSeasonsError: null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = 'loading';
        state.categoriesError = null; 
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = 'succeeded';
        state.categories = action.payload; 

      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = 'failed';
        state.categoriesError = action.payload;
      })
      .addCase(fetchPhases.pending, (state) => {
        state.phasesLoading = 'loading';
        state.phasesError = null;
      })
      .addCase(fetchPhases.fulfilled, (state, action) => {
        state.phasesLoading = 'succeeded';
        state.phases = action.payload; 
      })
      .addCase(fetchPhases.rejected, (state, action) => {
        state.phasesLoading = 'failed';
        state.phasesError = action.payload;
      })
      .addCase(fetchWorkouts.pending, (state) => {
        state.workoutsLoading = 'loading';
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.workoutsLoading = 'succeeded';
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.workoutsLoading = 'failed';
        state.workoutsError = action.payload;
      })
      .addCase(fetchWorkoutTypes.pending, (state) => {
        state.workoutTypesLoading = 'loading';
        state.workoutTypesError = null;
      })
      .addCase(fetchWorkoutTypes.fulfilled, (state, action) => {
        state.workoutTypesLoading = 'succeeded';
        state.workoutTypes = action.payload;
      })
      .addCase(fetchWorkoutTypes.rejected, (state, action) => {
        state.workoutTypesLoading = 'failed';
        state.workoutTypesError = action.payload;
      })
      .addCase(fetchChallengeCategories.pending, (state) => {
        state.challengeCategoriesLoading = 'loading';
        state.challengeCategoriesError = null;
      })
      .addCase(fetchChallengeCategories.fulfilled, (state, action) => {
        state.challengeCategoriesLoading = 'succeeded';
        state.challengeCategories = action.payload;
      })
      .addCase(fetchChallengeCategories.rejected, (state, action) => {
        state.challengeCategoriesLoading = 'failed';
        state.challengeCategoriesError = action.payload;
      })
      .addCase(fetchActiveSeasons.pending, (state) => {
        state.activeSeasonsLoading = 'loading';
        state.activeSeasonsError = null;
      })
      .addCase(fetchActiveSeasons.fulfilled, (state, action) => {
        state.activeSeasonsLoading = 'succeeded';
        state.activeSeasons = action.payload;
      })
      .addCase(fetchActiveSeasons.rejected, (state, action) => {
        state.activeSeasonsLoading = 'failed';
        state.activeSeasonsError = action.payload;
      });
  },
});

export default commonSlice.reducer;

