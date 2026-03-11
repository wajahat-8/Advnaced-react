import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL


export const getAllCategories = createAsyncThunk(
  'challenges/getAllCategories',
  
  async (token, {rejectWithValue }) => {
    try {
      if (!token) {
        return rejectWithValue('No authentication token found. Please log in.');
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get(
        `${BASE_URL}/challenges/get-all-categories`,
        config
      );
      return response.data.data;

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch categories.';
      return rejectWithValue(errorMessage);
    }
  }
);


export const addCategory = createAsyncThunk(
  'challenges/addCategory',
  async ({ categoryData, token }, { rejectWithValue }) => {
    try {
      if (!token) {
        return rejectWithValue('No authentication token found. Please log in.');
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };
      const response = await axios.post(
        `${BASE_URL}/challenges/add-new-category`,
        categoryData, 
        config
      );
      return response.data;

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create category.';
      return rejectWithValue(errorMessage);
    }
  }
);


// In your challenge thunk file

export const editChallengeCategory = createAsyncThunk(
  'challenges/editCategory',
  async ({ categoryData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/challenges/edit-category`, 
        categoryData, 
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);



