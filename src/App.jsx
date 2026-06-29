/**
 * App.jsx
 * Root component. Wraps the app with context providers and the router.
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import AppRouter from './routes/AppRouter';

const App = () => (
  <BrowserRouter>
    <UIProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </UIProvider>
  </BrowserRouter>
);

export default App;
