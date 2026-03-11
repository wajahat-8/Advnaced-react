import { createSlice } from "@reduxjs/toolkit";
import { getWorkouts, createWorkout, getUploadUrl, uploadVideo, uploadVideoAndCreateWorkout, deleteWorkout, editWorkout } from "./workoutThunk";

const adminSlice = createSlice({
  name: 'workout',
  initialState: {
    loading: false,
    success: false,
    error: null,
    adminToken: null,
    workouts: [],
    totalWorkouts: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
    workoutFormData: null,
    uploadUrl: null,
    fileUrl: null,
    uploadStatus: "idle", 
    uploadProgress: 0,
    uploadErrorMessage: "",
    uploadedFileName: null,
    retrySignal: false,
  },
  reducers: {
    setWorkoutFormData: (state, action) => {
      state.workoutFormData = action.payload;
    },
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
    },
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.workoutFormData = null;
      state.uploadUrl = null; 
      state.fileUrl = null;
      state.uploadStatus = "idle";
      state.uploadProgress = 0;
      state.uploadErrorMessage = "";
      state.uploadedFileName = null;
      state.retrySignal = false;
    },
    clearStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    startUpload: (state, action) => {
      state.uploadStatus = "gettingUrl";
      state.uploadProgress = 0;
      state.uploadErrorMessage = "";
      state.uploadedFileName = action.payload.fileName;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    setUploadStatus: (state, action) => {
      state.uploadStatus = action.payload;
    },
    setUploadError: (state, action) => {
      state.uploadStatus = "error";
      state.uploadErrorMessage = action.payload;
    },
    setCreatingWorkout: (state) => {
      state.uploadStatus = "creating";
    },
    requestRetry: (state) => {
        state.retrySignal = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload.workouts;
        state.totalWorkouts = action.payload.totalWorkouts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = Number(action.payload.currentPage);
        state.limit = Number(action.payload.limit);
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.workouts = []; 
      })
      .addCase(createWorkout.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.workoutFormData = null; 
        state.uploadUrl = null; 
        state.fileUrl = null;
        state.uploadStatus = "idle";
        state.uploadProgress = 0;
        state.uploadErrorMessage = "";
        state.uploadedFileName = null;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getUploadUrl.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUploadUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.uploadUrl = action.payload.uploadUrl;
        state.fileUrl = action.payload.fileUrl;
      })
      .addCase(getUploadUrl.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(uploadVideo.pending, (state) => {
        state.uploadStatus = "uploading";
      })
      .addCase(uploadVideo.fulfilled, (state) => {
        state.uploadStatus = "success";
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.uploadStatus = "error";
        state.uploadErrorMessage = action.payload || "Upload failed";
      })
      .addCase(uploadVideoAndCreateWorkout.pending, (state) => {
        state.uploadStatus = "gettingUrl";
        state.uploadProgress = 0;
        state.uploadErrorMessage = "";
        state.retrySignal = false;
      })
      .addCase(uploadVideoAndCreateWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.workoutFormData = null; 
        state.uploadUrl = null; 
        state.fileUrl = null;
        state.uploadStatus = "completed";
        state.uploadProgress = 100;
        state.uploadErrorMessage = "";
        state.uploadedFileName = null;
      })
      .addCase(uploadVideoAndCreateWorkout.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
         if (action.payload?.cancelled) {
          return;
        }
        state.error = typeof action.payload === 'string' ? action.payload : 'Process failed';
        state.uploadStatus = "error";
        state.uploadErrorMessage = typeof action.payload === 'string' ? action.payload : 
          (action.payload?.message || action.error?.message || "Process failed");
      })
       .addCase(deleteWorkout.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = state.workouts.filter(w => (w._id || w.id) !== action.payload);
        state.totalWorkouts -= 1; 
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editWorkout.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(editWorkout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.workouts.findIndex(w => (w._id || w.id) === (action.payload._id || action.payload.id));
        if (index !== -1) {
          state.workouts[index] = action.payload;
        }
      })
      .addCase(editWorkout.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetState, clearStatus,requestRetry, setWorkoutFormData,setCurrentPage, setUploadError, setUploadProgress, setUploadStatus, startUpload, setCreatingWorkout } = adminSlice.actions;
export default adminSlice.reducer;