import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import shopReducer from '../features/shop/shopSlice';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        tasks: tasksReducer,
        shop: shopReducer,
        posts: postsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
