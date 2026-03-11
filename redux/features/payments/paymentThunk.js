import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const fetchPaymentRequests = createAsyncThunk(
  'payments/fetchPaymentRequests',
  async ({ token, page, limit, type }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page: page,
        limit: limit,
      };
      if (type) {
        requestBody.type = type;
      }

      const response = await axios.post(
        `${BASE_URL}/admin/payment-requests`,
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

export const markPaymentAsPaid = createAsyncThunk(
  'payments/markAsPaid',
  async ({ walletHistoryId, token }, { rejectWithValue }) => {
    try {
      const requestBody = {
        walletHistoryId,
      };

      const response = await axios.post(
        `${BASE_URL}/admin/paid-to-user`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return walletHistoryId;
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
)