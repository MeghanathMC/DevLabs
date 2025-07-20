import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-bg-primary touch-manipulation';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-500 to-rose-500 text-white border-none shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-rose-600 hover:-translate-y-0.5 active:translate-y-0 active:from-indigo-700 active:to-rose-700',
    secondary: 'bg-transparent text-indigo-400 border-2 border-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-rose-500 hover:text-white hover:border-transparent active:from-indigo-600 active:to-rose-600',
    tertiary: 'bg-transparent text-indigo-400 border-none hover:bg-indigo-500/10 hover:text-indigo-300',
    ghost: 'bg-transparent text-text-secondary border-none hover:bg-bg-tertiary hover:text-text-primary',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white border-none shadow-sm hover:from-red-600 hover:to-red-700 hover:-translate-y-0.5 active:translate-y-0'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px]'
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};