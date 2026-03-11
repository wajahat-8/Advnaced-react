import { createSlice } from "@reduxjs/toolkit";
import { fetchKettlebucksHistory } from "./kettlebuckThunk";

const initialState = {
  history: [],
  loading: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  totalRecords: 0,
};

const kettlebucksSlice = createSlice({
  name: 'kettlebucks',
  initialState,
  reducers: {
    resetKettlebucksState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKettlebucksHistory.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchKettlebucksHistory.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        
        state.history = action.payload.data || []; 
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.page || 1;
        state.totalRecords = action.payload.total || 0;
        state.limit = action.payload.limit || 10;
      })
      .addCase(fetchKettlebucksHistory.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload; 
        state.history = [];
      });
  },
});

export const { resetKettlebucksState } = kettlebucksSlice.actions;

export default kettlebucksSlice.reducer;