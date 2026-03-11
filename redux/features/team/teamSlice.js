import { createSlice } from "@reduxjs/toolkit";
import { fetchTeams, removeTeamMember, createTeam,fetchTeamWorkouts,addTeamMember } from "./teamThunk";

const initialState = {
  teams: [],
  loading: 'idle', 
  error: null,
  success: false, 
  createsucces:false,
  createerror:null,
  totalTeams: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 20,
  teamWorkouts: [],
  workoutLoading: 'idle',
  workoutError: null,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    resetTeamStatus: (state) => {
        state.loading = 'idle';
        state.success = false;
        state.error = null;
        state.createsucces=false;
        state.createerror=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = 'loading';
        state.error = null; 
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.teams = action.payload.teams;
        state.totalTeams = action.payload.totalTeams;
        state.totalPages = action.payload.totalPages;
        state.currentPage = Number(action.payload.page); 
        state.limit = Number(action.payload.limit);       
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload; 
      })
      .addCase(removeTeamMember.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(removeTeamMember.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
      })
      .addCase(removeTeamMember.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload;
      })
      .addCase(createTeam.pending, (state) => {
        state.loading = 'loading';
        state.createsucces = false;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.createsucces = true;
        state.teams.unshift(action.payload.data);
        state.totalTeams += 1; 
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = 'failed';
        state.createerror = true;
        state.createerror = action.payload;
      })
      .addCase(fetchTeamWorkouts.pending, (state) => {
        state.workoutLoading = 'loading';
        state.workoutError = null;
      })
      .addCase(fetchTeamWorkouts.fulfilled, (state, action) => {
        state.workoutLoading = 'succeeded';
        state.teamWorkouts = action.payload.data; 
      })
      .addCase(fetchTeamWorkouts.rejected, (state, action) => {
        state.workoutLoading = 'failed';
        state.workoutError = action.payload;
      })
      .addCase(addTeamMember.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // state.success = true;
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeamStatus } = teamSlice.actions;
export default teamSlice.reducer;
