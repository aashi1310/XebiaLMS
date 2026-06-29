/**
 * AssignmentItem.jsx
 * Renders a single assignment in the timeline or list view.
 * Shows due date label, title, course name, and status badge.
 */

import React from 'react';
import Badge from '../common/Badge';

const AssignmentItem = ({ assignment, timeline = false }) => {
  const { title, course, dueDateLabel, status, grade } = assignment;

  if (timeline) {
    return (
      <div className="flex items-start gap-3">
        {/* Timeline dot */}
        <span className="w-2.5 h-2.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide">{dueDateLabel}</p>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 mt-0.5">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{course}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{course} · {dueDateLabel}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {grade && <span className="text-xs font-semibold text-green-600">{grade}</span>}
        <Badge label={status} />
      </div>
    </div>
  );
};

export default React.memo(AssignmentItem);
