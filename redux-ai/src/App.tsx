import React from 'react';
import { Counter } from './features/counter/Counter';
import { Tasks } from './features/tasks/Tasks';
import { Shop } from './features/shop/Shop';
import { PostsList } from './features/posts/PostsList';

const App: React.FC = () => {
    return (
        <div className="dashboard">
            <header className="header">
                <h1>Redux Toolkit Academy 🚀</h1>
                <p>Welcome to your state management learning dashboard!</p>
            </header>

            <main className="grid">
                {/* 1. Basic Example (Numbers) */}
                <Counter />

                {/* 2. Arrays/Objects Data Structure Example */}
                <Tasks />

                {/* 3. Real API Example (Thunk + JSONPlaceholder) */}
                <PostsList />

                {/* 4. Complex Async Example (Simulated Shop) */}
                <Shop />
            </main>
        </div>
    );
}

export default App;
