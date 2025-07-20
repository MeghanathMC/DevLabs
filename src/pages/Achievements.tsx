import React, { useEffect, useState } from 'react';
import { PlusIcon, TrophyIcon, AcademicCapIcon, StarIcon } from '@heroicons/react/24/outline';
import { achievementsAPI } from '../services/api';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';

interface Achievement {
  id: string;
  type: 'certificate' | 'award' | 'participation' | 'recognition' | 'scholarship';
  title: string;
  description?: string;
  issuer: string;
  date: Date;
  expiryDate?: Date;
  certificateUrl?: string;
  verificationUrl?: string;
  badgeUrl?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  featured: boolean;
  skills: string[];
  projectId?: string;
}

export const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await achievementsAPI.getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'award':
        return TrophyIcon;
      case 'certificate':
        return AcademicCapIcon;
      case 'recognition':
        return StarIcon;
      default:
        return TrophyIcon;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'award':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'certificate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'recognition':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
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
          <h1 className="text-3xl font-bold text-text-primary">Achievements</h1>
          <p className="mt-2 text-text-secondary">Track your awards, certificates, and recognitions.</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: achievements.length, color: 'bg-blue-500' },
          { label: 'Awards', value: achievements.filter(a => a.type === 'award').length, color: 'bg-yellow-500' },
          { label: 'Certificates', value: achievements.filter(a => a.type === 'certificate').length, color: 'bg-green-500' },
          { label: 'Featured', value: achievements.filter(a => a.featured).length, color: 'bg-purple-500' },
        ].map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <div className={`w-4 h-4 ${stat.color.replace('bg-', 'bg-')} rounded`}></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-text-tertiary">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {achievements.map((achievement) => {
          const IconComponent = getAchievementIcon(achievement.type);
          return (
            <div key={achievement.id} className="card-interactive p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${getAchievementColor(achievement.type)}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">
                        {achievement.title}
                        {achievement.featured && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">
                            Featured
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-text-secondary mb-2">{achievement.issuer}</p>
                      {achievement.description && (
                        <p className="text-text-secondary mb-3">{achievement.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-text-primary">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-tertiary">{achievement.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      {achievement.certificateUrl && (
                        <a
                          href={achievement.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                        >
                          View Certificate
                        </a>
                      )}
                      {achievement.verificationUrl && (
                        <a
                          href={achievement.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                        >
                          Verify
                        </a>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <TrophyIcon className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No achievements yet</h3>
            <p className="text-text-secondary mb-6">
              Start building your achievement portfolio by adding your first award, certificate, or recognition.
            </p>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Your First Achievement
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};