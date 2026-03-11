import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUploadUrls = createAsyncThunk(
    'uploadVideos/getUrls',
    async ({ wodId, seasonId, fileName, userId, teamId }, thunkAPI) => {
        try {
            const API_URL = `${BASE_URL}/common/upload-url`;

            const body = {
                type: 'wod',
                wodId,
                seasonId,
                fileName,
            };

            if (teamId) {
                body.teamId = teamId;
            } else {
                body.userId = userId;
            }

            const response = await axios.post(API_URL, body);

            if (response.data && response.data.data) {
                return response.data.data;
            }

            return thunkAPI.rejectWithValue('Invalid response from server.');

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const createSubmission = createAsyncThunk(
    'uploadVideos/createSubmission',
    async (submissionData, thunkAPI) => {
        try {
            const API_URL = `${BASE_URL}/workout/admin/submissionbyAdmin`;
            const { token, ...body } = submissionData;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.post(API_URL, body, config);
            return response.data;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);





export const updateSubmission = createAsyncThunk(
    'uploadVideos/updateSubmission',
    async ({ token, submissionId, body }, thunkAPI) => {
        try {
            const API_URL = `${BASE_URL}/workout/admin/submission/${submissionId}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(API_URL, body, config);
            return response.data;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
