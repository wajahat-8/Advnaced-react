import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/adminAuth/login `, adminData);
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);