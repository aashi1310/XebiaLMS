/**
 * Loader.jsx
 * Centered spinner shown during data loading states.
 */

import React from 'react';

const Loader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3" role="status" aria-live="polite">
    <span className="w-8 h-8 border-3 border-[#6C1D5F] border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }} />
    <span className="text-sm text-slate-500 dark:text-slate-400">{message}</span>
  </div>
);

export default Loader;
