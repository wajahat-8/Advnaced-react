import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchKettlebucksHistory = createAsyncThunk(
  'kettlebucks/fetchHistory',
  async (params, { rejectWithValue }) => {
    try {
      const requestBody = {
        season: params.season,
        searchName: params.searchName.toLowerCase(),
        limit: params.limit,
      };
      if (!params.searchName) {
        requestBody.page = params.page;
      }
      if (params.searchName){
        requestBody.page=1
      }
      console.log('Fetching KettleBucks history with params:', requestBody);

      const response = await axios.post(
        `${BASE_URL}/kettlebucks/admin/get-kettlebucks`, 
        requestBody
      );

      console.log('KettleBucks history fetched successfully:', response.data);
      return response.data.data; 

    } catch (error) {
      console.error('Failed to fetch KettleBucks history:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);