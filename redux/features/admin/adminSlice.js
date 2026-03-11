import { createSlice } from "@reduxjs/toolkit";
import { createAdmin, getAdmins,deleteAdmin } from './adminThunk'; 


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [], 
    loading: false,
    createSuccess: false,
    createError: null,
    fetchLoading: false,
    fetchError: null,
    deleteError:null
  },
  reducers: {
    clearCreateStatus: (state) => {
      state.loading = false;
      state.deleteError = null;
    },
    clearDeleteStatus: (state) => {
      state.loading = false;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.createSuccess = false;
        state.createError = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.admins.unshift(action.payload.admin); 
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload;
      })
      .addCase(getAdmins.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.admins = action.payload; 
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const { adminId } = action.meta.arg;
        state.admins = state.admins.filter((admin) => admin.id !== adminId);
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      });
      
  },
});

export const { clearCreateStatus ,clearDeleteStatus} = adminSlice.actions;
export default adminSlice.reducer;
