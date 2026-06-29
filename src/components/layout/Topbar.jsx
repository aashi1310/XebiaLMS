/**
 * Topbar.jsx
 *
 * Top navigation bar for the dashboard.
 * Contains: search bar, notification bell, dark mode toggle, username.
 * Matches the reference design exactly.
 */

import React, { useState } from 'react';
import { RiBellLine, RiSunLine, RiMoonLine, RiMenuLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import useDebounce from '../../hooks/useDebounce';
import { FaFire } from 'react-icons/fa'; // Wait, let's use a native emoji or simple icon if FaFire isn't imported

const Topbar = ({ onSearch }) => {
  const { user } = useAuth();
  const { isDark, toggleDark, toggleSidebar } = useUI();
  const location = useLocation();

  // Local search state with debounce for global search
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Propagate debounced value to parent when provided
  React.useEffect(() => {
    onSearch?.(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const isOverview = location.pathname === '/' || location.pathname === '/dashboard';

  // Format today's date
  const today = new Date();
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-GB', dateOptions);

  return (
    <header className={`h-20 shrink-0 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 transition-colors ${isOverview ? 'bg-transparent' : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700'}`}>
      
      {/* Left section (Greeting or Mobile Menu) */}
      <div className="flex items-center gap-3 mt-4">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <RiMenuLine className="text-xl" />
        </button>

        {isOverview && (
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mb-0.5">{formattedDate}</span>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Morning, {user?.name?.split(' ')[0] || 'Khushpreet'}.</h1>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E8] dark:bg-orange-900/30 text-[#F97316] text-[11px] font-bold tracking-wide">
                <span>🔥</span> 7-day streak
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right section (Search, Dark mode, Notifications) */}
      <div className="flex items-center gap-3 mt-4">
        {/* Search bar */}
        <div className="w-64 lg:w-80 hidden sm:block">
          <div className="relative">
             <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
                placeholder="Search modules, skills..."
                className="bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700"
              />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
          </button>

          {/* Notification bell */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 relative"
            aria-label="Notifications"
          >
            <RiBellLine className="text-lg" />
            {/* Unread dot */}
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
