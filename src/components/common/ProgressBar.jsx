/**
 * ProgressBar.jsx
 * Horizontal progress bar with percentage label.
 * Uses color coded fill based on progress level.
 */

import React from 'react';
import { getProgressColor } from '../../utils/formatters';

const ProgressBar = ({ progress = 0, showLabel = true, height = 6 }) => {
  const fillColor = getProgressColor(progress);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{progress}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: fillColor }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
