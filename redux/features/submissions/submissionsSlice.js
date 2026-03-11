import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTab: 'workout',
    searchQuery: '',
    currentPage: 1,
    challengeCategory: '',
    challengeStatus: '',
    workoutTitle: '',
    workoutCategory: '',
    workoutStatus: '',
};

const submissionsSlice = createSlice({
    name: 'submissionsUI',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            // When tab changes, reset filters and page
            state.activeTab = action.payload;
            state.searchQuery = '';
            state.currentPage = 1;
            state.challengeCategory = '';
            state.challengeStatus = '';
            state.workoutTitle = '';
            state.workoutCategory = '';
            state.workoutStatus = '';
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset page on new search
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setChallengeFilters: (state, action) => {
            state.challengeCategory = action.payload.challengeCategory;
            state.challengeStatus = action.payload.challengeStatus;
            state.currentPage = 1;
        },
        setWorkoutFilters: (state, action) => {
            state.workoutTitle = action.payload.workoutTitle;
            state.workoutCategory = action.payload.workoutCategory;
            state.workoutStatus = action.payload.workoutStatus;
            state.currentPage = 1;
        },
        // Individual filter setters
        setChallengeCategory: (state, action) => {
            state.challengeCategory = action.payload;
            state.currentPage = 1;
        },
        setChallengeStatus: (state, action) => {
            state.challengeStatus = action.payload;
            state.currentPage = 1;
        },
        setWorkoutTitle: (state, action) => {
            state.workoutTitle = action.payload;
            state.currentPage = 1;
        },
        setWorkoutCategory: (state, action) => {
            state.workoutCategory = action.payload;
            state.currentPage = 1;
        },
        setWorkoutStatus: (state, action) => {
            state.workoutStatus = action.payload;
            state.currentPage = 1;
        },
    },
});

export const {
    setActiveTab,
    setSearchQuery,
    setCurrentPage,
    setChallengeCategory,
    setChallengeStatus,
    setWorkoutTitle,
    setWorkoutCategory,
    setWorkoutStatus,
} = submissionsSlice.actions;

export default submissionsSlice.reducer;