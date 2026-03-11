import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { increment, decrement, incrementByAmount } from './counterSlice';

export const Counter: React.FC = () => {
    // Read data from the Redux Store
    const count = useAppSelector((state) => state.counter.value);

    // Get the dispatch function to send actions
    const dispatch = useAppDispatch();

    return (
        <div className="card">
            <h2 className="card-title">🔢 The Basics: Counter</h2>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>
                Learn how to dispatch simple synchronous actions.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="btn btn-danger" onClick={() => dispatch(decrement())}>
                    - 1
                </button>

                <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</span>

                <button className="btn" onClick={() => dispatch(increment())}>
                    + 1
                </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <button className="btn" onClick={() => dispatch(incrementByAmount(5))} style={{ width: '100%' }}>
                    Add 5 (Payload Example)
                </button>
            </div>
        </div>
    );
};
