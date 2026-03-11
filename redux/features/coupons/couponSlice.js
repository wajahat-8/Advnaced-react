import { createSlice } from '@reduxjs/toolkit';
import { fetchCoupons, addCoupon,editCoupon,deleteCoupon } from './couponsThunk';

const initialState = {
  coupons: [],
  loading: 'idle', 
  error: null,
  success: false, 
  deleteSuccess:false,
  totalCoupons: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10, 
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    resetCouponStatus: (state) => {
        state.loading = 'idle';
        state.success = false;
        state.error = null;
        state.deleteSuccess=false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.coupons = action.payload.coupons || [];
        state.totalCoupons = action.payload.pagination.totalCoupons || 0;
        state.totalPages = action.payload.pagination.totalPages || 0;
        state.currentPage = action.payload.pagination.currentPage || 1;
        state.limit = action.payload.pagination.limit || 10;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.coupons = [];
      })

      .addCase(addCoupon.pending, (state) => {
        state.loading = 'loading';
        state.success = false;
        state.error = null;
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true;
        state.coupons.unshift(action.payload);
        state.totalCoupons += 1;
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.loading = 'failed';
        state.success = false;
        state.error = action.payload;
      })
      .addCase(editCoupon.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(editCoupon.fulfilled, (state, action) => {
        state.loading = 'succeeded';
         const index = state.coupons.findIndex(coupon => coupon._id === action.payload.id);

    if (index !== -1) {
        state.coupons[index] = { ...state.coupons[index], ...action.payload };
    }
      })
      .addCase(editCoupon.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.deleteSuccess = true;
        state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload);
        state.totalCoupons -= 1;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.success = false;
      });


  },
});

export const { resetCouponStatus } = couponSlice.actions;
export default couponSlice.reducer;