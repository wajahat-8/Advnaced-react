import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchChallenges = createAsyncThunk(
  'challenges/fetchChallenges',
  async ({ token, page, limit, type, challengeStatus, searchName }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page: page,
        limit: limit,
      };
      if (type) requestBody.type = type;
      if (challengeStatus) requestBody.challengeStatus = challengeStatus;
      if (searchName) requestBody.searchName = searchName.toLowerCase();

      const response = await axios.post(
        `${BASE_URL}/admin/challenges`, 
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

export const createChallenge = createAsyncThunk(
  'challenges/createChallenge',
  async ({ challengeData, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('title', challengeData.title);
      formData.append('description', challengeData.description);
      formData.append('startDate', challengeData.startDate);
      formData.append('endDate', challengeData.endDate);
      formData.append('category', challengeData.category); 
      formData.append('betAmount', challengeData.betAmount);
      formData.append('inviteAllUsers', true);
      
      if (challengeData.bannerPicture) {
        formData.append('bannerPicture', challengeData.bannerPicture);
      }    
      const response = await axios.post(
        `${BASE_URL}/challenges`, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;    
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);



export const updateChallenge = createAsyncThunk(
  'challenges/updateChallenge',
  async ({ challengeId, challengeStatus, endDate, token }, { rejectWithValue }) => {
    try {
      const requestBody = {
        challengeId,
        challengeStatus,
      };

      if (endDate) {
        requestBody.endDate = endDate;
      }

      const response = await axios.patch(
        `${BASE_URL}/admin/challenge`,
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




