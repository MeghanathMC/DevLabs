import React, { useState } from 'react';
import { EyeIcon, ShareIcon, Cog6ToothIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

export const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const [activeTemplate, setActiveTemplate] = useState('modern');

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with focus on visual elements',
      preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional business-style layout perfect for corporate roles',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and innovative design for creative professionals',
      preview: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design focused on content',
      preview: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
    }
  ];

  const portfolioUrl = `https://hackfolio.com/portfolio/${user?.portfolioSlug || 'your-username'}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="mt-2 text-gray-600">Customize and manage your public portfolio.</p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button variant="outline">
            <Cog6ToothIcon className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline">
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Portfolio URL Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Portfolio URL</h2>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Your Portfolio URL</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-bg-tertiary rounded-lg p-3 border border-indigo-500/20">
            <code className="text-indigo-400 font-mono text-sm">{portfolioUrl}</code>
          </div>
          <Button variant="outline" size="sm">
            <ShareIcon className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            Copy Link
          </Button>
        </div>
        <p className="text-sm text-text-tertiary mt-2">
          This is your public portfolio URL that you can share with recruiters and employers.
        </p>
      </div>
      </div>

      {/* Portfolio Status */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Portfolio Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Visibility</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400">
              Public
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Last Updated</span>
            <span className="text-text-primary">2 days ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Template</span>
            <span className="text-text-primary capitalize">{activeTemplate}</span>
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Views', value: '2,847', change: '+12%' },
          { label: 'This Month', value: '456', change: '+8%' },
          { label: 'Unique Visitors', value: '1,923', change: '+15%' }
        ].map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-tertiary">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              </div>
              <span className="text-emerald-400 text-sm font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Template Selection */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Choose Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                activeTemplate === template.id
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'border-indigo-500/20 hover:border-indigo-500/40'
              }`}
              onClick={() => setActiveTemplate(template.id)}
            >
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-text-primary mb-1">{template.name}</h3>
                <p className="text-sm text-text-secondary">{template.description}</p>
              </div>
              {activeTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-1">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Customization Panel */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Customization</h2>
        
        <div className="space-y-6">
          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Color Scheme</label>
            <div className="flex space-x-3">
              {[
                { name: 'Indigo', colors: ['bg-indigo-500', 'bg-indigo-400', 'bg-indigo-300'] },
                { name: 'Rose', colors: ['bg-rose-500', 'bg-rose-400', 'bg-rose-300'] },
                { name: 'Violet', colors: ['bg-violet-500', 'bg-violet-400', 'bg-violet-300'] },
                { name: 'Amber', colors: ['bg-amber-500', 'bg-amber-400', 'bg-amber-300'] },
              ].map((scheme) => (
                <button
                  key={scheme.name}
                  className="flex space-x-1 p-2 rounded-lg border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-colors"
                >
                  {scheme.colors.map((color, index) => (
                    <div key={index} className={`w-4 h-4 ${color} rounded`}></div>
                  ))}
                </button>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Portfolio Sections</label>
            <div className="space-y-2">
              {[
                { name: 'About Me', enabled: true },
                { name: 'Featured Projects', enabled: true },
                { name: 'All Projects', enabled: true },
                { name: 'Achievements', enabled: true },
                { name: 'Skills & Technologies', enabled: true },
                { name: 'Contact Information', enabled: true },
                { name: 'Resume Download', enabled: false },
              ].map((section, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg">
                  <span className="text-sm font-medium text-text-primary">{section.name}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={section.enabled}
                    />
                    <div className="w-11 h-6 bg-bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-500/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline">
            Reset to Default
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Export Options */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Export & Share</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
            <DocumentArrowDownIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Export PDF</span>
            <span className="text-sm text-text-tertiary">Download portfolio</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
            <ShareIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Share Link</span>
            <span className="text-sm text-text-tertiary">Copy portfolio URL</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
            <EyeIcon className="h-8 w-8 mb-2" />
            <span className="font-medium">Preview</span>
            <span className="text-sm text-text-tertiary">See public view</span>
          </Button>
        </div>
      </div>
    </div>
  );
};