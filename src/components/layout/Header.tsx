import React from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-bg-secondary border-b border-indigo-500/20 lg:pl-72">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-text-secondary hover:text-text-primary transition-colors duration-200 lg:hidden"
          onClick={onMenuClick}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-text-tertiary hover:text-text-secondary transition-colors duration-200 rounded-lg hover:bg-indigo-500/5">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full"></span>
          </button>

          {/* User avatar */}
          <div className="flex items-center space-x-3">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
              alt={user?.firstName}
            />
            <span className="hidden sm:block text-sm font-medium text-text-primary">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};