import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/common/wodpro-categories`); 
      return response.data.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const fetchPhases = createAsyncThunk(
  'common/fetchPhases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/common/phases`); 

      return response.data.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);



export const fetchWorkouts = createAsyncThunk(
  'common/fetchWorkouts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/common/workouts`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const fetchWorkoutTypes = createAsyncThunk(
  'common/fetchWorkoutTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/common/workout-types`);
      return response.data.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const fetchChallengeCategories = createAsyncThunk(
  'common/fetchChallengeCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/common//challenge-categories`);

      return response.data.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const fetchActiveSeasons = createAsyncThunk(
  'common/fetchActiveSeasons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/common/seasons`); 
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);








