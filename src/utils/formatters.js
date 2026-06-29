/**
 * formatters.js
 * Utility functions for formatting display values.
 */

/**
 * Returns a time-based greeting for the dashboard header.
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Returns initials from a full name string.
 * Example: "Student Kumar" => "SK"
 */
export const getInitials = (name = '') => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Formats a date string to a readable label.
 * Example: "2024-10-23" => "Oct 23, 2024"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Returns a CSS color class based on progress percentage.
 */
export const getProgressColor = (progress) => {
  if (progress >= 80) return '#01AC9F'; // teal - near complete
  if (progress >= 40) return '#6C1D5F'; // purple - in progress
  return '#94A3B8'; // grey - just started
};

/**
 * Returns a badge color class based on assignment status.
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-orange-100 text-orange-700';
    case 'submitted': return 'bg-blue-100 text-blue-700';
    case 'graded': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-600';
  }
};

/**
 * Truncates text to a given character limit with ellipsis.
 */
export const truncate = (text, limit = 80) => {
  if (!text || text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + '…';
};
