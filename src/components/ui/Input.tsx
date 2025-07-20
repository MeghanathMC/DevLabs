import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'block w-full bg-bg-tertiary border-2 rounded-lg px-4 py-3 text-text-primary text-base min-h-[44px] transition-colors duration-200 ease-out',
          'focus:outline-none focus:ring-3 focus:ring-indigo-500/10',
          error 
            ? 'border-error text-error placeholder-error/60 focus:border-error' 
            : 'border-indigo-500/20 placeholder-text-tertiary focus:border-indigo-500',
          'disabled:bg-bg-primary disabled:text-text-tertiary disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-error flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
});