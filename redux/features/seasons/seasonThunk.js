import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL

export const getSeasons = createAsyncThunk(
  'seasons/getSeasons',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/season`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.data;
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);

export const createSeason = createAsyncThunk(
  'seasons/createSeason',
  async ({ token, seasonData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/season`, seasonData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.data;
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);



export const fetchSeasonDetails = createAsyncThunk(
  'seasons/fetchDetails',
  async ({ token, seasonId, phase, division }, { rejectWithValue }) => {
    try {
      const requestBody = {
        seasonId,
        phase,
      };

      if (division) {
        requestBody.division = division;
      }

      const response = await axios.post(
        `${BASE_URL}/admin/category-participants`, 
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