import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Global Styles!

// Connecting the Redux Store!
import { Provider } from 'react-redux';
import { store } from './app/store';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        {/* By wrapping with <Provider>, all components can access Redux using hooks */}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
