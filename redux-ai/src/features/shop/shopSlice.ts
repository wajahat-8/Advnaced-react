import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 1. Data Interfaces
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface ShopState {
    products: Product[];
    cart: Product[]; // Storing full products in cart for simplicity
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// 2. Initial State
const initialState: ShopState = {
    products: [],
    cart: [],
    status: 'idle',
    error: null,
};

// 3. createAsyncThunk (ASYNCHRONOUS LOGIC)
// This automatically generates 3 Redux action types: pending, fulfilled, and rejected!
export const fetchProducts = createAsyncThunk('shop/fetchProducts', async () => {
    // We are simulating an API call here. In reality, you'd use fetch() or axios.
    // E.g., const response = await fetch('https://fakestoreapi.com/products?limit=3');
    // return response.json();
    return new Promise<Product[]>((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Redux T-Shirt",
                    description: "Learn async logic in style",
                    price: 25.00,
                    image: "👕"
                },
                {
                    id: 2,
                    title: "Cool Mug",
                    description: "For all that state management caffeine",
                    price: 15.50,
                    image: "☕"
                },
            ]);
        }, 1500); // Simulate a 1.5 second loading delay
    });
});

// 4. The Slice
export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        // SYNCHRONOUS logic goes here
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cart.push(action.payload);
        },
        clearCart: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
        // ASYNCHRONOUS logic goes inside extraReducers!
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const { addToCart, clearCart } = shopSlice.actions;

export default shopSlice.reducer;
