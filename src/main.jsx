// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BookmarkProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BookmarkProvider>
    </AuthProvider>
  </React.StrictMode>
);
