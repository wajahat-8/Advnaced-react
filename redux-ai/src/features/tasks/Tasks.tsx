import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addTask, toggleTask, deleteTask } from './tasksSlice';

export const Tasks: React.FC = () => {
    const tasks = useAppSelector(state => state.tasks.items);
    const dispatch = useAppDispatch();
    const [text, setText] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTask(text));
            setText('');
        }
    };

    return (
        <div className="card">
            <h2 className="card-title">📝 Arrays & Objects: Tasks</h2>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>
                Learn how Immer safely mutates objects and arrays in state.
            </p>

            <form onSubmit={handleAdd} className="input-flex">
                <input
                    type="text"
                    className="input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="New task..."
                />
                <button type="submit" className="btn">Add</button>
            </form>

            <ul className="list">
                {tasks.map(task => (
                    <li key={task.id} className="list-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => dispatch(toggleTask(task.id))}
                                style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                            />
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'inherit' }}>
                                {task.text}
                            </span>
                        </div>
                        <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => dispatch(deleteTask(task.id))}>
                            ✖
                        </button>
                    </li>
                ))}
                {tasks.length === 0 && <p className="text-muted text-center">No tasks yet.</p>}
            </ul>
        </div>
    );
};
