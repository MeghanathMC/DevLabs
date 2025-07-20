import React, { useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { Input } from './Input';
import { projectsAPI } from '../../services/api';

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ProjectData {
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'blockchain' | 'iot' | 'game' | 'other';
  status: 'completed' | 'ongoing' | 'abandoned';
  images: string[];
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
    youtube?: string;
    slides?: string;
  };
  hackathon: {
    name: string;
    date: string;
    location: string;
    duration: string;
    organizer: string;
    website?: string;
  };
  team: Array<{
    name: string;
    role: string;
    github?: string;
    linkedin?: string;
  }>;
  achievements: string[];
  tags: string[];
  featured: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [newTechnology, setNewTechnology] = useState('');
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', github: '', linkedin: '' });
  const [newAchievement, setNewAchievement] = useState('');
  const [newTag, setNewTag] = useState('');

  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    shortDescription: '',
    description: '',
    technologies: [],
    category: 'web',
    status: 'completed',
    images: [],
    links: {},
    hackathon: {
      name: '',
      date: '',
      location: '',
      duration: '',
      organizer: ''
    },
    team: [],
    achievements: [],
    tags: [],
    featured: false
  });

  const handleInputChange = (field: string, value: any) => {
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

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addTeamMember = () => {
    if (newTeamMember.name.trim() && newTeamMember.role.trim()) {
      setFormData(prev => ({
        ...prev,
        team: [...prev.team, { ...newTeamMember }]
      }));
      setNewTeamMember({ name: '', role: '', github: '', linkedin: '' });
    }
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  const addAchievement = () => {
    if (newAchievement.trim() && !formData.achievements.includes(newAchievement.trim())) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement('');
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a !== achievement)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.shortDescription || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await projectsAPI.createProject(formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        title: '',
        shortDescription: '',
        description: '',
        technologies: [],
        category: 'web',
        status: 'completed',
        images: [],
        links: {},
        hackathon: {
          name: '',
          date: '',
          location: '',
          duration: '',
          organizer: ''
        },
        team: [],
        achievements: [],
        tags: [],
        featured: false
      });
      setCurrentStep(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-500/20">
          <h2 className="text-xl font-semibold text-text-primary">Add New Project</h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-indigo-500/20">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-bg-tertiary text-text-tertiary'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-indigo-500' : 'bg-bg-tertiary'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-text-tertiary">
            {currentStep === 1 && 'Basic Information'}
            {currentStep === 2 && 'Hackathon Details'}
            {currentStep === 3 && 'Team & Links'}
            {currentStep === 4 && 'Review & Submit'}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <Input
                label="Project Title *"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter project title"
              />
              
              <Input
                label="Short Description *"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                placeholder="Brief description (max 200 characters)"
                maxLength={200}
              />
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Description *
                </label>
                <textarea
                  rows={4}
                  className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-text-primary"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed project description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-text-primary"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI/ML</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="iot">IoT</option>
                    <option value="game">Game Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Status
                  </label>
                  <select
                    className="block w-full px-3 py-2 bg-bg-tertiary border border-indigo-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-text-primary"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="abandoned">Abandoned</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add technology"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button onClick={addTechnology} disabled={!newTechnology.trim()}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-500/10 text-indigo-400"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="ml-2 text-indigo-300 hover:text-indigo-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <Input
                label="Hackathon Name *"
                value={formData.hackathon.name}
                onChange={(e) => handleInputChange('hackathon.name', e.target.value)}
                placeholder="e.g., HackMIT 2024"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date *"
                  type="date"
                  value={formData.hackathon.date}
                  onChange={(e) => handleInputChange('hackathon.date', e.target.value)}
                />
                
                <Input
                  label="Duration"
                  value={formData.hackathon.duration}
                  onChange={(e) => handleInputChange('hackathon.duration', e.target.value)}
                  placeholder="e.g., 36 hours"
                />
              </div>
              
              <Input
                label="Location"
                value={formData.hackathon.location}
                onChange={(e) => handleInputChange('hackathon.location', e.target.value)}
                placeholder="e.g., MIT Campus, Cambridge"
              />
              
              <Input
                label="Organizer"
                value={formData.hackathon.organizer}
                onChange={(e) => handleInputChange('hackathon.organizer', e.target.value)}
                placeholder="e.g., MIT"
              />
              
              <Input
                label="Website"
                value={formData.hackathon.website}
                onChange={(e) => handleInputChange('hackathon.website', e.target.value)}
                placeholder="https://hackmit.org"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Team Members
                </label>
                <div className="space-y-4 mb-4">
                  {formData.team.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-bg-tertiary rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{member.name}</p>
                        <p className="text-sm text-text-tertiary">{member.role}</p>
                      </div>
                      <button
                        onClick={() => removeTeamMember(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Name"
                    value={newTeamMember.name}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Role"
                    value={newTeamMember.role}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    placeholder="GitHub (optional)"
                    value={newTeamMember.github}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, github: e.target.value }))}
                  />
                  <Input
                    placeholder="LinkedIn (optional)"
                    value={newTeamMember.linkedin}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, linkedin: e.target.value }))}
                  />
                </div>
                <Button onClick={addTeamMember} className="mt-2" disabled={!newTeamMember.name.trim() || !newTeamMember.role.trim()}>
                  Add Team Member
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Project Links
                </label>
                <div className="space-y-4">
                  <Input
                    label="GitHub Repository"
                    value={formData.links.github}
                    onChange={(e) => handleInputChange('links.github', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                  <Input
                    label="Live Demo"
                    value={formData.links.demo}
                    onChange={(e) => handleInputChange('links.demo', e.target.value)}
                    placeholder="https://demo-link.com"
                  />
                  <Input
                    label="Devpost"
                    value={formData.links.devpost}
                    onChange={(e) => handleInputChange('links.devpost', e.target.value)}
                    placeholder="https://devpost.com/software/project"
                  />
                  <Input
                    label="YouTube Video"
                    value={formData.links.youtube}
                    onChange={(e) => handleInputChange('links.youtube', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Achievements
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                  />
                  <Button onClick={addAchievement} disabled={!newAchievement.trim()}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.achievements.map((achievement, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-500/10 text-amber-400"
                    >
                      🏆 {achievement}
                      <button
                        onClick={() => removeAchievement(achievement)}
                        className="ml-2 text-amber-300 hover:text-amber-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-4 bg-bg-tertiary rounded-lg">
                <h3 className="font-medium text-text-primary mb-2">Project Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {formData.title}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>Status:</strong> {formData.status}</p>
                  <p><strong>Technologies:</strong> {formData.technologies.join(', ')}</p>
                  <p><strong>Team Members:</strong> {formData.team.length}</p>
                  <p><strong>Achievements:</strong> {formData.achievements.length}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded border-indigo-500/20 text-indigo-500 focus:ring-indigo-500/10"
                />
                <label htmlFor="featured" className="text-sm text-text-primary">
                  Feature this project on my portfolio
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-indigo-500/20">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 