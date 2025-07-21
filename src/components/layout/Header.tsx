import React from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-bg-secondary border-b border-indigo-500/20 lg:pl-72 sticky top-0 z-40">
      <div className="header-mobile">
        <button
          type="button"
          className="touch-target -m-2.5 p-2.5 text-text-secondary hover:text-text-primary transition-colors duration-200 lg:hidden focus-ring-mobile"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* User avatar */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-indigo-500/20"
            src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
            alt={user?.firstName}
          />
          <span className="hidden sm:block text-sm font-medium text-text-primary">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="sm:hidden text-sm font-medium text-text-primary">
            {user?.firstName}
          </span>
        </div>
      </div>
    </header>
  );
};