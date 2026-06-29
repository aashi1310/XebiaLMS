/**
 * Avatar.jsx
 * Displays a user avatar — image if available, initials fallback.
 */

import React from 'react';

const SIZES = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

const Avatar = ({ src, initials = '?', size = 'md', className = '' }) => {
  const sizeClass = SIZES[size] || SIZES.md;

  if (src) {
    return (
      <img
        src={src}
        alt={initials}
        className={`${sizeClass} rounded-full object-cover shrink-0 ${className}`}
      />
    );
  }

  return (
    <span
      className={`${sizeClass} rounded-full bg-[#6C1D5F] text-white font-semibold inline-flex items-center justify-center shrink-0 ${className}`}
      aria-label={`Avatar for ${initials}`}
    >
      {initials}
    </span>
  );
};

export default Avatar;
