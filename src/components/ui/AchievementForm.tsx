import React, { useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from './button';
import { Input } from './Input';
import { achievementsAPI } from '../../services/api';

interface AchievementFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface AchievementData {
  type: 'certificate' | 'award' | 'participation' | 'recognition' | 'scholarship';
  title: string;
  description?: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  certificateUrl?: string;
  verificationUrl?: string;
  badgeUrl?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  featured: boolean;
  skills: string[];
  projectId?: string;
}

export const AchievementForm: React.FC<AchievementFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [formData, setFormData] = useState<AchievementData>({
    type: 'certificate',
    title: '',
    description: '',
    issuer: '',
    date: '',
    expiryDate: '',
    certificateUrl: '',
    verificationUrl: '',
    badgeUrl: '',
    category: '',
    level: 'intermediate',
    featured: false,
    skills: [],
    projectId: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.issuer || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await achievementsAPI.createAchievement(formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        type: 'certificate',
        title: '',
        description: '',
        issuer: '',
        date: '',
        expiryDate: '',
        certificateUrl: '',
        verificationUrl: '',
        badgeUrl: '',
        category: '',
        level: 'intermediate',
        featured: false,
        skills: [],
        projectId: ''
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-500/20">
          <h2 className="text-xl font-semibold text-text-primary">Add New Achievement</h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Achievement Type *
                </label>
                <select
                  className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-text-primary"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="certificate">Certificate</option>
                  <option value="award">Award</option>
                  <option value="participation">Participation</option>
                  <option value="recognition">Recognition</option>
                  <option value="scholarship">Scholarship</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Level
                </label>
                <select
                  className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-text-primary"
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            <Input
              label="Achievement Title *"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., AWS Solutions Architect Associate"
            />
            
            <Input
              label="Issuing Organization *"
              value={formData.issuer}
              onChange={(e) => handleInputChange('issuer', e.target.value)}
              placeholder="e.g., Amazon Web Services"
            />
            
            <Input
              label="Category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Cloud Computing, Web Development"
            />
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-text-primary"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the achievement..."
              />
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Dates</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date Received *"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
              
              <Input
                label="Expiry Date (if applicable)"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Links & Verification</h3>
            
            <Input
              label="Certificate URL"
              value={formData.certificateUrl}
              onChange={(e) => handleInputChange('certificateUrl', e.target.value)}
              placeholder="https://certificate-url.com"
            />
            
            <Input
              label="Verification URL"
              value={formData.verificationUrl}
              onChange={(e) => handleInputChange('verificationUrl', e.target.value)}
              placeholder="https://verification-url.com"
            />
            
            <Input
              label="Badge URL"
              value={formData.badgeUrl}
              onChange={(e) => handleInputChange('badgeUrl', e.target.value)}
              placeholder="https://badge-url.com"
            />
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Related Skills</h3>
            
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button onClick={addSkill} disabled={!newSkill.trim()}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-indigo-300 hover:text-indigo-100"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Options</h3>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="rounded border-indigo-500/20 text-indigo-500 focus:ring-indigo-500/10"
              />
              <label htmlFor="featured" className="text-sm text-text-primary">
                Feature this achievement on my portfolio
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 p-6 border-t border-indigo-500/20">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating...' : 'Create Achievement'}
          </Button>
        </div>
      </div>
    </div>
  );
}; 