import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchPosts, removePost, clearAllPosts } from './postsSlice';

export const PostsList: React.FC = () => {
    // Read the current Posts state from Redux
    const { posts, status, error } = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();

    // Trigger the initial data fetch exactly once when the component mounts
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    return (
        <div className="card">
            <h2 className="card-title">📡 Real API Call: Posts</h2>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>
                Fetching real placeholder data from an external REST API (JSONPlaceholder) using `createAsyncThunk`.
            </p>

            {/* Render the 3 possible states manually returned from the API backend! */}
            {status === 'loading' && <p>⏳ Loading posts over the network...</p>}

            {status === 'failed' && <p className="text-danger">❌ Error: {error}</p>}

            {status === 'succeeded' && (
                <>
                    <button className="btn btn-danger" onClick={() => dispatch(clearAllPosts())}>
                        Clear All Posts
                    </button>
                    <ul className="list">
                        {posts.map(post => (
                            <li key={post.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', border: '1px solid var(--border-color)', marginBottom: '0.5rem', background: '#fff' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{post.title}</h4>
                                <p className="text-sm text-muted">{post.body}</p>

                                <button
                                    className="btn btn-danger"
                                    style={{ marginTop: '0.75rem', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                                    onClick={() => dispatch(removePost(post.id))}
                                >
                                    Delete Locally
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
