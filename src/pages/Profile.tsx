import React, { useState, useEffect } from 'react';
import { CameraIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { userAPI } from '../services/api';

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    university: user?.university || '',
    graduationYear: user?.graduationYear || '',
    skills: user?.skills || [],
    socialLinks: {
      github: user?.socialLinks?.github || '',
      linkedin: user?.socialLinks?.linkedin || '',
      portfolio: user?.socialLinks?.portfolio || '',
      twitter: user?.socialLinks?.twitter || ''
    }
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        location: user.location || '',
        university: user.university || '',
        graduationYear: user.graduationYear || '',
        skills: user.skills || [],
        socialLinks: {
          github: user.socialLinks?.github || '',
          linkedin: user.socialLinks?.linkedin || '',
          portfolio: user.socialLinks?.portfolio || '',
          twitter: user.socialLinks?.twitter || ''
        }
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = await userAPI.updateProfile(formData);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original values
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        location: user.location || '',
        university: user.university || '',
        graduationYear: user.graduationYear || '',
        skills: user.skills || [],
        socialLinks: {
          github: user.socialLinks?.github || '',
          linkedin: user.socialLinks?.linkedin || '',
          portfolio: user.socialLinks?.portfolio || '',
          twitter: user.socialLinks?.twitter || ''
        }
      });
    }
    setIsEditing(false);
    setError('');
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await userAPI.changePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account information and preferences.</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
          {error}
        </div>
      )}

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
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                <XMarkIcon className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveProfile} disabled={loading}>
                <CheckIcon className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Email Address"
            type="email"
            value={user?.email}
            disabled
            helperText="Email cannot be changed"
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="University"
            value={formData.university}
            onChange={(e) => handleInputChange('university', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Graduation Year"
            type="number"
            value={formData.graduationYear}
            onChange={(e) => handleInputChange('graduationYear', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Portfolio Slug"
            value={user?.portfolioSlug || 'your-username'}
            disabled
            helperText="This appears in your portfolio URL"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
          <textarea
            rows={4}
            className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 disabled:bg-bg-primary disabled:text-text-tertiary text-text-primary"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-2">Skills</label>
          {isEditing && (
            <div className="mb-4">
              <Input
                placeholder="Add a skill and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-indigo-300 hover:text-indigo-100"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-3">Social Links</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GitHub"
              value={formData.socialLinks.github}
              onChange={(e) => handleInputChange('socialLinks.github', e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="LinkedIn"
              value={formData.socialLinks.linkedin}
              onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Portfolio Website"
              value={formData.socialLinks.portfolio}
              onChange={(e) => handleInputChange('socialLinks.portfolio', e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Twitter"
              value={formData.socialLinks.twitter}
              onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
              disabled={!isEditing}
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
            <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(!isChangingPassword)}>
              Change Password
            </Button>
          </div>

          {isChangingPassword && (
            <div className="p-4 bg-bg-tertiary rounded-lg space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Enter your current password"
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Enter your new password"
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm your new password"
              />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleChangePassword} disabled={loading}>
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </div>
          )}

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