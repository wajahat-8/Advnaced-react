import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "./authThunk"; 

const adminSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success: false,
    error: null,
    adminToken: null, 
    fullName: null,
    profilePicture: null,
  },
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.adminToken = null;
      state.fullName = null;
      state.profilePicture = null;
    },
    clearAdminStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.adminToken = action.payload.data.token;
        state.fullName = action.payload.data.fullName;
        state.profilePicture = action.payload.data.profilePicture;
        localStorage.setItem('fullname',state.fullName)
        localStorage.setItem('profilepicture',state.profilePicture)
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdminState, clearAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;