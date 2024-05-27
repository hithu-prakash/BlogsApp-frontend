import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider, useAuth} from './context/useAuth'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
);