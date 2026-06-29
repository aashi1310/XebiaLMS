/**
 * SearchBar.jsx
 * Reusable search input component.
 * Designed to work with the useDebounce hook for delayed queries.
 */

import React from 'react';
import { RiSearchLine, RiCloseLine } from 'react-icons/ri';

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <RiSearchLine className="absolute left-3 text-slate-400 text-base pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full border border-transparent focus:border-[#6C1D5F] focus:outline-none focus:ring-0 transition-colors placeholder:text-slate-400"
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Clear search"
        >
          <RiCloseLine className="text-base" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
