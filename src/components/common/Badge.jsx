/**
 * Badge.jsx
 * Small label component for categories, tags, and status chips.
 */

import React from 'react';

// Predefined color maps for known categories
const CATEGORY_COLORS = {
  'AI/ML': 'bg-purple-100 text-purple-700',
  'Cloud': 'bg-blue-100 text-blue-700',
  'Frontend': 'bg-orange-100 text-orange-700',
  'Data': 'bg-cyan-100 text-cyan-700',
  'DevOps': 'bg-green-100 text-green-700',
  'pending': 'bg-orange-100 text-orange-700',
  'submitted': 'bg-blue-100 text-blue-700',
  'graded': 'bg-green-100 text-green-700',
  'Beginner': 'bg-green-100 text-green-700',
  'Intermediate': 'bg-yellow-100 text-yellow-700',
  'Advanced': 'bg-red-100 text-red-700',
};

const Badge = ({ label, className = '', dot = false }) => {
  const colorClass = CATEGORY_COLORS[label] || 'bg-gray-100 text-gray-600';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {label}
    </span>
  );
};

export default Badge;
