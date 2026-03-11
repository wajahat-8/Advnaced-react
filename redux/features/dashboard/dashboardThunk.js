import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getDashboardAnalytics = createAsyncThunk(
  'dashboard/fetchAnalytics',
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/common/dashboard/analytics`, config);
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



export const fetchDashboardWorkouts = createAsyncThunk(
  'dashboard/fetchWorkouts',
  async (_, { rejectWithValue }) => {
    try {
      console.log("sending request to fetch workout analytics ")
      const response = await axios.get(
        `${BASE_URL}/workout/admin/activeWorkoutSubmissionCounts`, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log("fetched analytics data:",response.data.data)
      
      return Array.isArray(response.data.data) ? response.data.data : [];
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);