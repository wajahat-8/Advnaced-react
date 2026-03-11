import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async ({ token, page, limit, type, status, product }, { rejectWithValue }) => {
    try {
      const requestBody = {
        page,
        limit,
      };

      if (type) requestBody.type = type;
      if (status !== undefined) requestBody.Status = status;
      if (product) requestBody.product = product;

      const response = await axios.post(
        `${BASE_URL}/admin/getCoupons`, 
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




export const addCoupon = createAsyncThunk(
  'coupons/addCoupon',
  async ({ couponData, token }, { rejectWithValue }) => {
    try {
      const requestBody = {
        code: couponData.code,
        type: couponData.type,
        value: couponData.value,
        maxRedemptions: couponData.maxRedemptions,
        applicableTo: couponData.applicableTo,
        isActive: couponData.isActive,
      };

      if (couponData.validFrom) {
        requestBody.validFrom = couponData.validFrom;
      }
      if (couponData.validUntil) {
        requestBody.validUntil = couponData.validUntil;
      }

      const response = await axios.post(
        `${BASE_URL}/coupons`,
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




export const editCoupon = createAsyncThunk(
  'coupons/editCoupon',
  async ({ couponId, couponData }, { rejectWithValue }) => {
    try {
      const requestBody = {
        code: couponData.code,
        type: couponData.type,
        value: couponData.value,
        maxRedemptions: couponData.maxRedemptions,
        validFrom: couponData.validFrom,
        validUntil: couponData.validUntil,
        applicableTo: couponData.applicableTo,
        isActive: couponData.isActive,
      };

      console.log(`Sending request to edit coupon ${couponId} with data:`, requestBody);

      const response = await axios.patch(
        `${BASE_URL}/coupons/${couponId}`,
        requestBody
      );

      return response.data.data;

    } catch (error) {
      console.error('Failed to edit coupon:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);


export const deleteCoupon = createAsyncThunk(
  'coupons/deleteCoupon',
  async (couponId, { rejectWithValue }) => {
    try {
      console.log('Attempting to delete coupon with ID:', couponId);

      await axios.delete(
        `${BASE_URL}/coupons/${couponId}`
      );

      return couponId;

    } catch (error) {
      console.error('Failed to delete coupon:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);