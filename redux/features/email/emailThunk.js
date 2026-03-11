import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendWorkoutEmail = createAsyncThunk(
  'email/sendWorkoutEmail',
  async (emailData, { rejectWithValue }) => {
    try {
      const requestBody = {
        workoutId: emailData.workoutId,
        title: emailData.subject, 
        message: emailData.message,
        complete: emailData.completed,
      };

      console.log('Sending email with data:', requestBody);

      const response = await axios.post(
        `${BASE_URL}/notification/admin/workout-submission-email-notification`, 
        requestBody
      );

      console.log('Email sent successfully:', response.data);
      return response.data;

    } catch (error) {
      console.error('Failed to send email:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);