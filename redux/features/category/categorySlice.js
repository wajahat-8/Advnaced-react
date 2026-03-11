import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories, addCategory } from './categoryThunk';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  success: false, 
  addSuccess:false

};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.categories = [];
      state.error = null;
      state.success = false;
      state.addSuccess=false
    },
    resetSuccess: (state) => {
        state.success = false;
        state.error = null; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.addSuccess = true; 
        if (action.payload.data) {
          state.categories.push(action.payload.data);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetCategories, resetSuccess } = categorySlice.actions;
export default categorySlice.reducer;