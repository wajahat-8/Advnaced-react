import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, deleteUser, createUser,getUserWorkouts } from "./userThunk";

const initialState = {
  users: [],
  loading: 'idle',
  error: null,    
  totalUsers: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 20,
  selectedUserWorkouts: [],
  detailLoading: 'idle',
  detailError: null,

};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = 'idle';
      state.error = null;
    },
    resetUserDetail: (state) => {
      state.selectedUserWorkouts = [];
      state.detailLoading = 'idle';
      state.detailError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading';
        state.error = null; 
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.totalPages = action.payload.totalPages;
        state.currentPage = Number(action.payload.page); 
        state.limit = Number(action.payload.limit);       
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.users = state.users.filter(user => (user.id) !== action.payload);
        state.totalUsers -= 1;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.totalUsers += 1;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = 'failed';
           state.error = action.payload;
        })
        .addCase(getUserWorkouts.pending, (state) => {
        state.detailLoading = 'loading'; // Updates the detail loading state
        state.detailError = null;
      })
      .addCase(getUserWorkouts.fulfilled, (state, action) => {
        state.detailLoading = 'succeeded';
        state.selectedUserWorkouts = action.payload; // Sets the new workouts variable
      })
      .addCase(getUserWorkouts.rejected, (state, action) => {
        state.detailLoading = 'failed';
        state.detailError = action.payload;
      });
  },
});

export const { resetUserState,resetUserDetail } = userSlice.actions;

export default userSlice.reducer;