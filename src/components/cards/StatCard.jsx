/**
 * StatCard.jsx
 * Small stat card for the dashboard showing a metric value and label.
 * Used for: Day Streak, Hours Completed, Courses Active, Certificates.
 */

import React from 'react';

const StatCard = ({ icon: Icon, value, label, iconBg = 'bg-purple-100', iconColor = 'text-purple-600' }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
    <span className={`w-9 h-9 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center text-base`}>
      <Icon />
    </span>
    <div>
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
    </div>
  </div>
);

export default React.memo(StatCard);
