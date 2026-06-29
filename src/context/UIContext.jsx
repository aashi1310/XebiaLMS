/**
 * UIContext.jsx
 *
 * Manages global UI state:
 * - Dark mode toggle (persisted to localStorage)
 * - Sidebar collapsed state for mobile
 * - Notification panel open state
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  // Dark mode: read initial value from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('xebia_dark');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Apply/remove 'dark' class on <html> element when isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('xebia_dark', String(isDark));
  }, [isDark]);

  const toggleDark = useCallback(() => setIsDark(prev => !prev), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleNotifications = useCallback(() => setNotificationsOpen(prev => !prev), []);

  const value = {
    isDark,
    toggleDark,
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    notificationsOpen,
    toggleNotifications,
    setNotificationsOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
};
