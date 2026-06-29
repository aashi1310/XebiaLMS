/**
 * EmptyState.jsx
 * Shown when a list has no items to display.
 */

import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

const EmptyState = ({
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
  icon: Icon = RiSearchLine,
  action = null,
}) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
    <span className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      <Icon className="text-2xl text-slate-400" />
    </span>
    <div>
      <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{title}</p>
      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{description}</p>
    </div>
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default EmptyState;
