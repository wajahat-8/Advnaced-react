import { createSlice } from "@reduxjs/toolkit";
import { fetchAthleteSubmissions } from "./athleteSubmissionThunk";

const initialState = {
    submissions: null, 
    loading: false,
    error: null,
};

const athleteSubmissionSlice = createSlice({
    name: 'athleteSubmissions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAthleteSubmissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAthleteSubmissions.fulfilled, (state, action) => {
                state.loading = false;
                state.submissions = action.payload;
            })
            .addCase(fetchAthleteSubmissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default athleteSubmissionSlice.reducer;

