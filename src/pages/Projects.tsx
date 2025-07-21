import React, { useEffect, useState } from 'react';
import { PlusIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { projectsAPI } from '../services/api';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/Input';
import { ProjectForm } from '../components/ui/ProjectForm';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'blockchain' | 'iot' | 'game' | 'other';
  status: 'completed' | 'ongoing' | 'abandoned';
  images: string[];
  hackathon?: {
    name: string;
    date: Date;
    location: string;
    duration: string;
    organizer: string;
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
  metrics: {
    views: number;
    likes: number;
    githubStars?: number;
  };
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleProjectCreated = () => {
    fetchProjects(); // Refresh the projects list
  };

  if (loading) {
    return (
      <LoadingSpinner variant="skeleton" />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
          <p className="mt-2 text-text-secondary">Manage and showcase your hackathon projects.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-text-tertiary" />
              <Input
                placeholder="Search projects or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-text-tertiary" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-bg-tertiary border border-indigo-500/20 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card-interactive overflow-hidden">
            <div className="relative">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              {project.featured && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                  Featured
                </div>
              )}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-medium ${
                project.status === 'completed' 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : project.status === 'ongoing'
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'bg-bg-tertiary text-text-secondary'
              }`}>
                {project.status}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h3>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.shortDescription}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bg-tertiary text-text-tertiary">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Hackathon Info */}
              {project.hackathon && (
                <div className="mb-4">
                  <p className="text-sm text-text-tertiary">
                    <span className="font-medium">{project.hackathon.name}</span>
                    <span className="mx-1">•</span>
                    {new Date(project.hackathon.date).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Achievements */}
              {project.achievements.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.achievements.slice(0, 2).map((achievement, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400"
                      >
                        🏆 {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-text-primary mb-2">No projects found</h3>
            <p className="text-text-secondary mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : "You haven't added any projects yet. Start by adding your first hackathon project!"
              }
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        </div>
      )}

      {/* Project Form Modal */}
      <ProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleProjectCreated}
      />
    </div>
  );
};