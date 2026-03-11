import { createSlice } from '@reduxjs/toolkit';
// 1. Import the new markPaymentAsPaid thunk
import { fetchPaymentRequests, markPaymentAsPaid } from './paymentThunk';

const initialState = {
  paymentRequests: [],
  loading: 'idle', 
  error: null,
  success: false, 
  totalRequests: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    resetPaymentStatus: (state) => {
        state.loading = 'idle';
        state.success = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentRequests.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchPaymentRequests.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.paymentRequests = action.payload.paymentRequests || [];
        state.totalRequests = action.payload.total || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.page || 1;
        state.limit = action.payload.limit || 10;
      })
      .addCase(fetchPaymentRequests.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.paymentRequests = [];
      })
      .addCase(markPaymentAsPaid.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(markPaymentAsPaid.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
      })
      .addCase(markPaymentAsPaid.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;

