import React, { useEffect, useState } from 'react';
import { PlusIcon, CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ArrowUpRight } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { competitionsAPI } from '../services/api';

interface Competition {
  id: string;
  name: string;
  type: 'hackathon' | 'coding-competition' | 'conference' | 'workshop';
  date: Date;
  endDate?: Date;
  location: string;
  organizer: string;
  website?: string;
  role: 'participant' | 'mentor' | 'judge' | 'speaker';
  team?: Array<{
    name: string;
    role: string;
  }>;
  description?: string;
  achievements: string[];
  projects?: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  images?: string[];
}

export const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompetitions = async () => {
    try {
      const data = await competitionsAPI.getCompetitions();
      setCompetitions(data);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      // If API fails, start with empty array for new users
      setCompetitions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'bg-indigo-500/10 text-indigo-400';
      case 'coding-competition':
        return 'bg-violet-500/10 text-violet-400';
      case 'conference':
        return 'bg-cyan-500/10 text-cyan-400';
      case 'workshop':
        return 'bg-amber-500/10 text-amber-400';
      default:
        return 'bg-bg-tertiary text-text-secondary';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'participant':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'mentor':
        return 'bg-amber-500/10 text-amber-400';
      case 'judge':
        return 'bg-rose-500/10 text-rose-400';
      case 'speaker':
        return 'bg-violet-500/10 text-violet-400';
      default:
        return 'bg-bg-tertiary text-text-secondary';
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
          <h1 className="text-3xl font-bold text-text-primary">Competitions & Events</h1>
          <p className="mt-2 text-text-secondary">Track your hackathons, competitions, and event participation.</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: competitions.length, color: 'bg-indigo-500' },
          { label: 'Hackathons', value: competitions.filter(c => c.type === 'hackathon').length, color: 'bg-violet-500' },
          { label: 'Awards Won', value: competitions.reduce((acc, c) => acc + c.achievements.length, 0), color: 'bg-amber-500' },
          { label: 'Upcoming', value: competitions.filter(c => c.status === 'upcoming').length, color: 'bg-cyan-500' },
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

      {/* Competitions Timeline */}
      {competitions.length > 0 ? (
        <div className="mx-auto max-w-3xl space-y-16 md:space-y-24">
          {competitions.map((competition) => (
            <div
              key={competition.id}
              className="relative flex flex-col gap-4 md:flex-row md:gap-16"
            >
              <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                <Badge variant="secondary" className="text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
                  {competition.type.replace('-', ' ')}
                </Badge>
                <span className="text-xs font-medium text-text-tertiary">
                  {new Date(competition.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="mb-3 text-lg leading-tight font-bold text-text-primary md:text-2xl">
                  {competition.name}
                </h2>
                <p className="text-sm text-text-secondary md:text-base mb-4">
                  {competition.description}
                </p>
                
                {/* Status and Role badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(competition.role)}`}>
                    {competition.role}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    competition.status === 'completed' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : competition.status === 'upcoming'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {competition.status}
                  </span>
                </div>

                {/* Event details */}
                <ul className="mt-4 ml-4 space-y-1.5 text-sm text-text-secondary md:text-base">
                  <li className="list-disc">
                    <CalendarIcon className="h-4 w-4 inline mr-2" />
                    {new Date(competition.date).toLocaleDateString()}
                    {competition.endDate && ` - ${new Date(competition.endDate).toLocaleDateString()}`}
                  </li>
                  <li className="list-disc">
                    <MapPinIcon className="h-4 w-4 inline mr-2" />
                    {competition.location}
                  </li>
                  <li className="list-disc">
                    <span className="font-medium">Organizer:</span> {competition.organizer}
                  </li>
                  {competition.team && (
                    <li className="list-disc">
                      <UsersIcon className="h-4 w-4 inline mr-2" />
                      {competition.team.length} team members
                    </li>
                  )}
                </ul>

                {/* Team Members */}
                {competition.team && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Team Members:</h4>
                    <ul className="ml-4 space-y-1.5 text-sm text-text-secondary">
                      {competition.team.map((member, index) => (
                        <li key={index} className="list-disc">
                          {member.name} - {member.role}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {competition.achievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Achievements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {competition.achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-amber-500/10 text-amber-400"
                        >
                          🏆 {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <CalendarIcon className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No competitions yet</h3>
            <p className="text-text-secondary mb-6">
              Start tracking your hackathons, competitions, and event participation by adding your first event.
            </p>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Your First Event
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};