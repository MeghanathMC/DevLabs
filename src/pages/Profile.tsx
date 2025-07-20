import React from 'react';
import { CameraIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account information and preferences.</p>
      </div>

      {/* Profile Picture & Basic Info */}
      <div className="card p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
              alt={user?.firstName}
              className="h-24 w-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors">
              <CameraIcon className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-text-secondary">{user?.email}</p>
            <p className="text-sm text-text-tertiary mt-1">
              Portfolio: hackfolio.com/portfolio/{user?.portfolioSlug || 'your-username'}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Personal Information</h2>
          <Button variant="outline" size="sm">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            defaultValue={user?.firstName}
            disabled
          />
          <Input
            label="Last Name"
            defaultValue={user?.lastName}
            disabled
          />
          <Input
            label="Email Address"
            type="email"
            defaultValue={user?.email}
            disabled
          />
          <Input
            label="Location"
            defaultValue={user?.location}
            disabled
          />
          <Input
            label="University"
            defaultValue={user?.university}
            disabled
          />
          <Input
            label="Graduation Year"
            type="number"
            defaultValue={user?.graduationYear?.toString()}
            disabled
          />
          <Input
            label="Portfolio Slug"
            defaultValue={user?.portfolioSlug || 'your-username'}
            disabled
            helperText="This appears in your portfolio URL"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
          <textarea
            rows={4}
            className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 disabled:bg-bg-primary disabled:text-text-tertiary text-text-primary"
            defaultValue={user?.bio}
            disabled
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {user?.skills?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-3">Social Links</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GitHub"
              defaultValue={user?.socialLinks?.github}
              disabled
            />
            <Input
              label="LinkedIn"
              defaultValue={user?.socialLinks?.linkedin}
              disabled
            />
            <Input
              label="Portfolio Website"
              defaultValue={user?.socialLinks?.portfolio}
              disabled
            />
            <Input
              label="Twitter"
              defaultValue={user?.socialLinks?.twitter}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-text-primary">Email Notifications</h3>
              <p className="text-sm text-text-tertiary">Receive updates about your portfolio views and activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-500/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-text-primary">Portfolio Privacy</h3>
              <p className="text-sm text-text-tertiary">Make your portfolio publicly visible</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-500/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-text-primary">Analytics Tracking</h3>
              <p className="text-sm text-text-tertiary">Allow tracking of portfolio views and interactions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-500/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-rose-500/30 p-6">
        <h2 className="text-lg font-semibold text-rose-400 mb-6">Danger Zone</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-rose-400">Change Password</h3>
              <p className="text-sm text-rose-300">Update your account password</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-rose-400">Delete Account</h3>
              <p className="text-sm text-rose-300">Permanently delete your account and all data</p>
            </div>
            <Button variant="danger" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};