import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Thunk to send a notification related to a workout.
 * Assumes an Axios interceptor is handling the Authorization token.
 */
export const sendWorkoutNotification = createAsyncThunk(
  'notifications/sendWorkout',
  // The token is no longer needed as an argument
  async (notificationData, { rejectWithValue }) => {
    try {
      const requestBody = {
        workoutId: notificationData.workoutId,
        title: notificationData.title,
        message: notificationData.message,
        complete: notificationData.completed,
      };

      console.log('Sending notification with data:', requestBody);

      const response = await axios.post(
        `${BASE_URL}/notification/admin/workout-submission-notification`, 
        requestBody
      );

      console.log('Notification sent successfully:', response.data);
      return response.data;

    } catch (error) {
      console.error('Failed to send notification:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);




export const sendUserCommunication = createAsyncThunk(
  'communication/send',
  async (data, { rejectWithValue }) => {
    try {
      const requestBody = {
        title: data.title,
        message: data.message,
        isEmail: data.isEmail,
      };

      if (data.isEmail) {
        requestBody.emails = data.emails;
      } else {
        requestBody.userIds = data.userIds;
      }

      console.log('Sending communication with data:', requestBody);

      const response = await axios.post(
        `${BASE_URL}/notification/admin/send-to-all-users`, 
        requestBody
      );

      console.log('Communication sent successfully:', response.data);
      return response.data;

    } catch (error) {
      console.error('Failed to send communication:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);