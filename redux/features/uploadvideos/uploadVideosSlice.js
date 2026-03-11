import { createSlice } from '@reduxjs/toolkit';
import { getUploadUrls, createSubmission, updateSubmission } from './uploadVideosThunk';

const initialState = {
    urls: null,
    loading: false,
    error: null,
    submissionStatus: 'idle', 
};

const uploadVideosSlice = createSlice({
    name: 'uploadVideos',
    initialState,
    reducers: {
        clearUrls: (state) => {
            state.urls = null;
        },
        resetSubmissionStatus: (state) => {
            state.submissionStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUploadUrls.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.urls = null;
            })
            .addCase(getUploadUrls.fulfilled, (state, action) => {
                state.loading = false;
                state.urls = action.payload;
            })
            .addCase(getUploadUrls.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSubmission.pending, (state) => {
                state.submissionStatus = 'loading';
            })
            .addCase(createSubmission.fulfilled, (state) => {
                state.submissionStatus = 'succeeded';
            })
            .addCase(createSubmission.rejected, (state, action) => {
                state.submissionStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updateSubmission.pending, (state) => {
                state.submissionStatus = 'loading';
            })
            .addCase(updateSubmission.fulfilled, (state) => {
                state.submissionStatus = 'succeeded';
            })
            .addCase(updateSubmission.rejected, (state, action) => {
                state.submissionStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearUrls, resetSubmissionStatus } = uploadVideosSlice.actions;
export default uploadVideosSlice.reducer;
