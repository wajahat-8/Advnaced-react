import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchProducts, addToCart, clearCart } from './shopSlice';

export const Shop: React.FC = () => {
    // Read shop state
    const { products, cart, status, error } = useAppSelector(state => state.shop);
    const dispatch = useAppDispatch();

    // Call fetchProducts thunk only once when component mounts
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    // Calculate generic cart total
    const cartTotal = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="card" style={{ gridColumn: '1 / -1' }}>
            <h2 className="card-title">🛒 Async APIs: Redux Storefront</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                Learn how `createAsyncThunk` handles Loading, Success, and Failure states automatically!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>

                {/* 1. Products List */}
                <div>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        Products
                    </h3>

                    {/* View States */}
                    {status === 'loading' && <p>⏳ Loading fake API data...</p>}
                    {status === 'failed' && <p className="text-danger">❌ Error: {error}</p>}

                    {status === 'succeeded' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {products.map(product => (
                                <div key={product.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', border: '1px solid var(--border-color)' }}>
                                    <div className="flex-between" style={{ width: '100%', marginBottom: '0.5rem' }}>
                                        <div style={{ fontSize: '2rem' }}>{product.image}</div>
                                        <div style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</div>
                                    </div>
                                    <h4 style={{ margin: 0 }}>{product.title}</h4>
                                    <p className="text-sm text-muted">{product.description}</p>

                                    <button
                                        className="btn"
                                        style={{ width: '100%', marginTop: '1rem' }}
                                        onClick={() => dispatch(addToCart(product))}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. Cart Summary */}
                <div>
                    <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <h3 style={{ margin: 0 }}>Your Cart</h3>
                        <span className="badge">{cart.length} items</span>
                    </div>

                    {cart.length === 0 ? (
                        <p className="text-muted">Cart is empty.</p>
                    ) : (
                        <div>
                            <ul className="list">
                                {cart.map((item, index) => (
                                    <li key={index} className="list-item" style={{ padding: '0.5rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{item.image}</span>
                                        <span>{item.title}</span>
                                        <span style={{ fontWeight: 'bold' }}>${item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex-between" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px dashed var(--border-color)' }}>
                                <h3>Total:</h3>
                                <h3>${cartTotal.toFixed(2)}</h3>
                            </div>

                            <button className="btn btn-danger" style={{ width: '100%', marginTop: '1rem' }} onClick={() => dispatch(clearCart())}>
                                Clear Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
