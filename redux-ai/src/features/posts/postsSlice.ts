import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 1. Data Interfaces
export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface PostsState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// 2. Initial State
const initialState: PostsState = {
    posts: [],
    status: 'idle',
    error: null
};

// 3. createAsyncThunk fetching real dummy data from JSONPlaceholder API
export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
    // Fetch real JSON data over the internet!
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    if (!response.ok) {
        throw new Error('Failed to fetch posts from API');
    }
    // Returns a Promise that resolves to the JSON payload
    return response.json();
});

// 4. The Slice handling both Local and Promise-based operations
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // You could add fully synchronous, local actions here (like deleting a post locally)!
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter((p) => p.id !== action.payload);
        },
        clearAllPosts: (state) => {
            state.posts = []
        }
    },
    extraReducers: (builder) => {
        // Listening to the fetchPosts Thunk's Promise Lifecycle
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading'; // Promise started
                state.error = null;
            })
            // Typescript correctly types action.payload as Post[] right here!
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = 'succeeded'; // Promise resolved successfully
                state.posts = action.payload; // Updating state arrays effortlessly with Immer
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'; // Promise rejected/Errored out
                state.error = action.error.message || 'An unknown error occurred';
            });
    }
});

// Export sync actions
export const { removePost, clearAllPosts } = postsSlice.actions;

// Export Reducer for the Store
export default postsSlice.reducer;
