/**
 * AuthContext.jsx
 *
 * Manages authentication state: current user, login, logout.
 * Persists user session to localStorage for page reload persistence.
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { loginUser } from '../services/mockApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Restore user from localStorage on initial load
    try {
      const stored = localStorage.getItem('xebia_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name?.toLowerCase() === 'shubhangam') {
          parsed.name = 'Student';
          localStorage.setItem('xebia_user', JSON.stringify(parsed));
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  /**
   * Attempts login with provided credentials.
   * On success, stores user in state + localStorage.
   */
  const login = useCallback(async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    const { data, error } = await loginUser(email, password);
    setAuthLoading(false);

    if (error) {
      setAuthError(error);
      return false;
    }

    setUser(data);
    localStorage.setItem('xebia_user', JSON.stringify(data));
    return true;
  }, []);

  /**
   * Clears user from state and localStorage.
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('xebia_user');
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    authLoading,
    authError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for consuming auth context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
