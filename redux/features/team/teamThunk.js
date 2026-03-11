import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async ({ token, page, limit, workoutTitle, category, phase, searchName }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page: page,
        limit: limit,
      };
      if (workoutTitle) requestBody.workoutTitle = workoutTitle;

      if (searchName) requestBody.searchName = searchName.toLowerCase();

      if (category) requestBody.category = category;
      if (phase) requestBody.phase = phase;

      const response = await axios.post(
        `${BASE_URL}/admin/get-teams`, 
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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





export const removeTeamMember = createAsyncThunk(
  'teams/removeMember',
  async ({ userId, teamId, token }, { rejectWithValue }) => {
    try {
      const requestBody = {
        userid: userId,
        teamid: teamId,
      };

      await axios.post(
        `${BASE_URL}/admin/remove-team-member`, 
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return { teamId, removedUserId: userId };
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);




export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData, { rejectWithValue }) => {
    try {
      console.log('Sending team creation request with data:', teamData);

      const response = await axios.post(
        `${BASE_URL}/admin/create-Team`, 
        teamData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Team created successfully:', response.data);
      return response.data;

    } catch (error) {
      console.error('Failed to create team:', error.response?.data || error.message);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);



export const fetchTeamWorkouts = createAsyncThunk(
  'teams/fetchTeamWorkouts',
  async ({ teamId, token }, { rejectWithValue }) => {
    try {
      const requestBody = {
        teamId: teamId,
      };

      const response = await axios.post(
        `${BASE_URL}/workout/admin/submission`, 
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addTeamMember = createAsyncThunk(
  'teams/addTeamMember',
  async ({ memberData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/team/admin/add-member`, 
        memberData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data;

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

