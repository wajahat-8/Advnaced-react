import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = `${import.meta.env.VITE_BASE_URL}/user/admin/workouts-and-submissions`;


export const fetchAthleteSubmissions = createAsyncThunk(
    'athleteSubmissions/fetch',
    async ({ userId, seasonId, token }, thunkAPI) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            
            const body = { userId, seasonId };

            const response = await axios.post(API_URL, body, config);

            if (response.data) {
                return response.data.data;
            }

            return thunkAPI.rejectWithValue('No data received from server.');

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);