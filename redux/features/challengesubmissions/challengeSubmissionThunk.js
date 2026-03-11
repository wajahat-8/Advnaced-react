import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchChallengeSubmissions = createAsyncThunk(
  'submissions/fetchChallengeSubmissions',
  async ({ token, page, limit, challengeTitle, challengeCategory, challengeSubmissionStatus,searchName }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page: page,
        limit: limit
      };
      if (challengeTitle) requestBody.challengeTitle = challengeTitle;
      if (challengeCategory) requestBody.challengeCategory = challengeCategory;
      if (challengeSubmissionStatus) requestBody.challengeSubmissionStatus = challengeSubmissionStatus;
      if (searchName) requestBody.searchName = searchName.toLowerCase();


      const response = await axios.post(
        `${BASE_URL}/admin/challenge-videos`, 
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




export const submitChallengeFeedback = createAsyncThunk(
  'challengeSubmissions/submitFeedback',
  async ({ challengeSubmissionId, feedBack, finalScore, token }, { rejectWithValue }) => {
    try {
      const requestBody = {
        challengeSubmissionId,
        feedBack,
        finalScore,
      };
      const response = await axios.post(
        `${BASE_URL}/admin/feedbackChallenge`, 
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






