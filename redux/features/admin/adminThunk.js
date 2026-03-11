import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL


export const createAdmin = createAsyncThunk(
  'admins/create', 
  async ({ token, adminData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${BASE_URL}/adminAuth/create-admin`, 
        adminData, 
        config
      );

      return response.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);




export const getAdmins = createAsyncThunk(
  'admins/fetchAll', 
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/adminAuth/get-all-admins`, config);
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





export const deleteAdmin = createAsyncThunk(
  'admins/delete',
  async ({ token, adminId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          adminId,
        },
      };

      const response = await axios.delete(
        `${BASE_URL}/adminAuth/delete-admin`,
        config
      );
      return response.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
