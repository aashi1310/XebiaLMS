/**
 * Button.jsx
 * Reusable button component supporting multiple variants,
 * sizes, loading state, and disabled state.
 */

import React from 'react';

const VARIANTS = {
  primary: 'bg-[#6C1D5F] hover:bg-[#4A1E47] text-white',
  secondary: 'bg-[#01AC9F] hover:bg-[#018076] text-white',
  outline: 'border border-[#6C1D5F] text-[#6C1D5F] hover:bg-[#6C1D5F] hover:text-white bg-transparent',
  'outline-white': 'border border-white text-white hover:bg-white hover:text-[#6C1D5F] bg-transparent',
  ghost: 'text-[#6C1D5F] hover:bg-purple-50 bg-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  onClick,
  type = 'button',
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#6C1D5F] disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
