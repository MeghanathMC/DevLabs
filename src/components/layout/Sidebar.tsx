import React, { Fragment } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { 
  HomeIcon, 
  FolderIcon, 
  TrophyIcon, 
  UserIcon, 
  ChartBarIcon,
  DocumentIcon,
  XMarkIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar as ModernSidebar, SidebarBody, SidebarLink } from '../ui/sidebar';
import { motion } from 'framer-motion';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/app/projects', icon: FolderIcon },
  { name: 'Competitions', href: '/app/competitions', icon: CalendarIcon },
  { name: 'Achievements', href: '/app/achievements', icon: TrophyIcon },
  { name: 'Portfolio', href: '/app/portfolio', icon: DocumentIcon },
  { name: 'Analytics', href: '/app/analytics', icon: ChartBarIcon },
  { name: 'Profile', href: '/app/profile', icon: UserIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Convert navigation items to sidebar links format
  const sidebarLinks = navigation.map(item => ({
    label: item.name,
    href: item.href,
    icon: <item.icon className="h-5 w-5 flex-shrink-0" />
  }));

  const Logo = () => {
    return (
      <div className="flex items-center space-x-2 py-1 px-3">
        <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">H</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold text-text-primary whitespace-pre"
        >
          HackFolio
        </motion.span>
      </div>
    );
  };

  const SidebarContent = () => (
    <ModernSidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo />
          <div className="mt-8 flex flex-col gap-1">
            {sidebarLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.href}
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <SidebarLink 
                    link={link} 
                    isActive={isActive}
                  />
                )}
              </NavLink>
            ))}
          </div>
        </div>
        
        {/* Bottom section with settings, logout, and user */}
        <div className="border-t border-indigo-500/20 pt-4 space-y-1">
          {/* Settings */}
          <SidebarLink
            link={{
              label: "Settings",
              href: "#",
              icon: <CogIcon className="h-5 w-5 flex-shrink-0" />
            }}
          />
          
          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="w-full"
          >
            <SidebarLink
              link={{
                label: "Sign out",
                href: "#",
                icon: <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0 text-rose-400" />
              }}
              className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/5"
            />
          </button>
          
          {/* User profile */}
          <div className="mt-4 pt-4 border-t border-indigo-500/20">
            <SidebarLink
              link={{
                label: `${user?.firstName} ${user?.lastName}`,
                href: "/app/profile",
                icon: (
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover border-2 border-indigo-500/30"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </div>
      </SidebarBody>
    </ModernSidebar>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full w-full flex-col bg-bg-secondary border-r border-indigo-500/20">
                  <SidebarContent />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
};