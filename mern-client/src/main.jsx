import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';


import './index.css';
import { CartProvider } from './context/CartContext';
import router from './routers/router';
import AuthProvider from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* ✅ wrap everything inside CartProvider */}
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
