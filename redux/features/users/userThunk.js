import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ token, page, limit, workoutTitle, category, phase, searchName, isPaid }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page: page,
        limit: limit,
      };

      if (workoutTitle) requestBody.workoutTitle = workoutTitle;
      if (searchName) requestBody.searchName = searchName.toLowerCase();
      if (category) requestBody.category = category;
      if (phase) requestBody.phase = phase;
      
      requestBody.isPaid = isPaid;

      
      const response = await axios.post(
        `${BASE_URL}/admin/get-users`, 
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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




export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/admin/deleteUser/${userId}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      return userId;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);





export const updateUserCategory = createAsyncThunk(
  'users/updateCategory',
  async ({ userId, category, token }, { rejectWithValue }) => {
    try {
      const requestBody = {
        id: userId,
        category: category,
      };

      const response = await axios.post(
        `${BASE_URL}/admin/changeUserCategory`,
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





export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {

      const response = await axios.post(
        `${BASE_URL}/user/admin/createUser`, 
        userData
      );

      
      return response.data.data; 

    } catch (error) {
      console.error('Failed to create user:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);



export const getUserWorkouts = createAsyncThunk(
  'users/getUserWorkouts',
  async (userId, { rejectWithValue }) => {
    try {
      const requestBody = {
        userId: userId,
      };

      console.log('Fetching workouts for user:', requestBody);
      const response = await axios.post(
        `${BASE_URL}/workout/admin/submission`, 
        requestBody
      );

      console.log('User workouts fetched successfully:', response.data);
      
      return response.data.data; 

    } catch (error) {
      console.error('Failed to fetch user workouts:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);