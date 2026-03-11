import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCategoryRankings = createAsyncThunk(
  'rankings/fetchCategoryRankings',
  async ({ seasonId, phase, category, page=1, limit=10 }, { rejectWithValue }) => {
    try {
      const requestBody = {
        category,
        phase,
        seasonId,
        page,
        limit,
      };
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${BASE_URL}/admin/participants-by-category`, 
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



export const assignDivision = createAsyncThunk(
  'rankings/assignDivision',
  async ({ selectedIds, division, phase, seasonId, token }, { rejectWithValue }) => {
    try {
      const updatePromises = selectedIds.map(rankingId => {
        const requestBody = {
          rankingId,
          division,
          phase,
          seasonId
        };
        return axios.post(
          `${BASE_URL}/admin/division`, 
          requestBody,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      });

      await Promise.all(updatePromises);

      return { updatedIds: selectedIds, newDivision: division };
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message || "An unknown error occurred during the update." });
      }
    }
  }
);


export const markAsGrandFinalist = createAsyncThunk(
  'rankings/markAsGrandFinalist',
  async ({ selectedIds, seasonId, token }, { rejectWithValue }) => {
    try {
      const updatePromises = selectedIds.map(rankingId => {
        const requestBody = {
          rankingId,
          phase: "Playoff",
          seasonId
        };
        return axios.post(
          `${BASE_URL}/admin/mark-as-grand-finalist`, 
          requestBody,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      });

      await Promise.all(updatePromises);
      return { updatedIds: selectedIds };
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message || "Failed to mark as grand finalist." });
      }
    }
  }
);
