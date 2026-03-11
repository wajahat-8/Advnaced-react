import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchWorkoutSubmissions = createAsyncThunk(
  'submissions/fetchWorkoutSubmissions',
  async ({ token, page, limit, workoutTitle, category, workOutSubmissionStatus,searchName }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page: page,
        limit: limit,
      };
      if (workoutTitle) requestBody.workoutTitle = workoutTitle;
      if (category) requestBody.category = category;
      if (workOutSubmissionStatus) requestBody.workOutSubmissionStatus = workOutSubmissionStatus;
      if (searchName) requestBody.searchName = searchName.toLowerCase();

      const response = await axios.post(
        `${BASE_URL}/admin/workout-videos`, 
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
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



export const submitWorkoutFeedback = createAsyncThunk(
  'workoutSubmissions/submitFeedback',
  async ({ workOutSubmissionId, feedBack, finalScore, token,isCompleted }, { rejectWithValue }) => {
    try {
      const requestBody = {
        workOutSubmissionId,
        feedBack,
        finalScore,
        isCompleted,
      };

      const response = await axios.post(
        `${BASE_URL}/admin/feedbackWorkout`, 
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.data;
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);