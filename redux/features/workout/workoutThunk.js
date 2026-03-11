import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUploadError, setCreatingWorkout,setUploadStatus,setUploadProgress } from './workoutSlice';



const BASE_URL = import.meta.env.VITE_BASE_URL

export const getWorkouts = createAsyncThunk(
  'workouts/getWorkouts',
  async ({ token, page, limit, seasonId, phase, type, workOutStatus, searchName }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page: page,
        limit: limit,
      };

      if (seasonId) requestBody.seasonId = seasonId;
      if (phase) requestBody.phase = phase;
      if (type) requestBody.type = type;
      if (workOutStatus !== undefined) requestBody.workOutStatus = workOutStatus;
      if (searchName) requestBody.searchName = searchName.toLowerCase();
      const response = await axios.post(
        `${BASE_URL}/admin/workouts`, 
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


export const createWorkout = createAsyncThunk(
  'workouts/createWorkout',
  async ({ workoutData, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in workoutData) {
        if (Object.prototype.hasOwnProperty.call(workoutData, key)) {
          const value = workoutData[key];
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else {
            formData.append(key, value);
          }
        }
      }
      const response = await axios.post(`${BASE_URL}/workout`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong while creating the workout'
      );
    }
  }
);


export const getUploadUrl = createAsyncThunk(
  'workouts/getUploadUrl',
  async ({ type, fileName, token }, { rejectWithValue }) => {
    try {
      const UPLOAD_URL_ENDPOINT = `${BASE_URL}/common/upload-url`; 

      const response = await axios.post(UPLOAD_URL_ENDPOINT, 
        { type, fileName }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      return response.data.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong while getting the upload URL'
      );
    }
  }
);



export const uploadVideo = createAsyncThunk(
  'workouts/uploadVideo',
  async ({ file, uploadUrl }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUploadStatus("uploading"));

      const response = await axios.put(uploadUrl, file, {
        skipAuth: true, //  tell interceptor not to attach token
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(setUploadProgress(percent));
          }
        },
      });

      dispatch(setUploadStatus("success"));
      return response.data;
    } catch (error) {
      let errorMessage = "Video upload failed. Please try again.";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      dispatch(setUploadError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);



export const uploadVideoAndCreateWorkout = createAsyncThunk(
  'workouts/uploadVideoAndCreateWorkout',
  async ({ file, workoutFormData, adminToken }, { dispatch, getState, rejectWithValue }) => {
    try {
      const uploadUrlResponse = await dispatch(getUploadUrl({
        type: "instruction",
        fileName: file.name,
        token: adminToken,
      })).unwrap();

      console.log("upload url:"+uploadUrlResponse.uploadUrl)
        await dispatch(uploadVideo({
        file,
        uploadUrl: uploadUrlResponse.uploadUrl,
        skipAuth: true
      })).unwrap();

      const { workout } = getState();
      if (!workout.fileUrl) {
        console.log("Upload process cancelled. Halting workout creation.");
         return rejectWithValue({ cancelled: true });
      }

      dispatch(setCreatingWorkout());

      const finalWorkoutData = {
        ...workoutFormData,
        videoUrl: uploadUrlResponse.fileUrl,
      };

      const workoutResponse = await dispatch(createWorkout({
        workoutData: finalWorkoutData,
        token: localStorage.getItem("token"),
      })).unwrap();

      return workoutResponse;

    } catch (error) {

if (error && error.cancelled) {
        console.log("Process cancelled by user. Suppressing notifications.");
        return rejectWithValue({ cancelled: true });
      }
      let errorMessage = "Failed to complete the process. Please try again.";
      
      if (typeof error === 'string') errorMessage = error;
      else if (error?.message) errorMessage = error.message;
      else if (error?.response?.data?.message) errorMessage = error.response.data.message;
      
      dispatch(setUploadError(errorMessage));
      return rejectWithValue(errorMessage); 
    }
  }
);










export const deleteWorkout = createAsyncThunk(
  'workout/deleteWorkout',
  async ({ workoutId, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/workout/${workoutId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      return workoutId;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);




export const editWorkout = createAsyncThunk(
  'workouts/editWorkout',
  async ({ workoutId, workoutData, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in workoutData) {
        if (Object.prototype.hasOwnProperty.call(workoutData, key)) {
          const value = workoutData[key];
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else {
            formData.append(key, value);
          }
        }
      }

      const response = await axios.patch( 
        `${BASE_URL}/workout/${workoutId}`, 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong while updating the workout'
      );
    }
  }
);









