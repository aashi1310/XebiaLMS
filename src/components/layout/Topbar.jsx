/**
 * Topbar.jsx
 *
 * Top navigation bar for the dashboard.
 * Contains: search bar, notification bell, dark mode toggle, username.
 * Matches the reference design exactly.
 */

import React from 'react';
import { RiBellLine, RiSunLine, RiMoonLine, RiMenuLine } from 'react-icons/ri';
import SearchBar from '../search/SearchBar';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

const Topbar = ({ onSearch }) => {
  const { user } = useAuth();
  const { isDark, toggleDark, toggleSidebar } = useUI();

  // Local search state with debounce for global search
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Propagate debounced value to parent when provided
  React.useEffect(() => {
    onSearch?.(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <header className="h-14 sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 px-4">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle sidebar"
      >
        <RiMenuLine className="text-lg" />
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search courses, skills, or people..."
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
        </button>

        {/* Notification bell */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          aria-label="Notifications"
        >
          <RiBellLine className="text-lg" />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#84117C]" />
        </button>

        {/* Username */}
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden sm:block pl-1">
          {user?.name || 'Student'}
        </span>
      </div>
    </header>
  );
};

export default Topbar;
