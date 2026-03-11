import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export interface TasksState {
    items: Task[];
}

const initialState: TasksState = {
    items: [
        { id: '1', text: 'Learn Redux Toolkit', completed: false },
        { id: '2', text: 'Master TypeScript', completed: true },
    ]
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.items.push({
                id: Date.now().toString(),
                text: action.payload,
                completed: false
            });
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.items.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        }
    }
});

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
