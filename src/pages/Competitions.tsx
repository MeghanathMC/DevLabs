import React, { useEffect, useState } from 'react';
import { PlusIcon, CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';
import { ArrowUpRight } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';

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

  useEffect(() => {
    // Mock data for competitions
    const mockCompetitions: Competition[] = [
      {
        id: '1',
        name: 'EcoHack 2024',
        type: 'hackathon',
        date: new Date('2024-03-15'),
        endDate: new Date('2024-03-17'),
        location: 'San Francisco, CA',
        organizer: 'EcoTech Foundation',
        website: 'https://ecohack2024.com',
        role: 'participant',
        team: [
          { name: 'Alex Chen', role: 'Full Stack Developer' },
          { name: 'Sarah Kim', role: 'UI/UX Designer' },
          { name: 'Mike Rodriguez', role: 'Data Scientist' }
        ],
        description: '48-hour hackathon focused on environmental sustainability solutions',
        achievements: ['1st Place Winner', 'Best Environmental Impact Award'],
        projects: ['EcoTracker'],
        status: 'completed'
      },
      {
        id: '2',
        name: 'HealthTech Hackathon 2024',
        type: 'hackathon',
        date: new Date('2024-02-10'),
        endDate: new Date('2024-02-12'),
        location: 'Boston, MA',
        organizer: 'HealthTech Alliance',
        role: 'participant',
        team: [
          { name: 'Alex Chen', role: 'Backend Developer' },
          { name: 'Emma Watson', role: 'Frontend Developer' }
        ],
        description: '36-hour healthcare innovation hackathon',
        achievements: ['2nd Place Winner'],
        projects: ['HealthBridge'],
        status: 'completed'
      },
      {
        id: '3',
        name: 'AI Innovation Summit 2024',
        type: 'conference',
        date: new Date('2024-04-20'),
        location: 'Seattle, WA',
        organizer: 'AI Innovators',
        role: 'participant',
        description: 'Conference on latest AI trends and innovations',
        achievements: [],
        status: 'upcoming'
      }
    ];

    setTimeout(() => {
      setCompetitions(mockCompetitions);
      setLoading(false);
    }, 1000);
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

              {/* Action buttons */}
              <div className="flex items-center justify-between mt-6">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                {competition.website && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={competition.website} target="_blank" rel="noopener noreferrer">
                      Event Website <ArrowUpRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {competitions.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <CalendarIcon className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No events recorded yet</h3>
            <p className="text-text-secondary mb-6">
              Start building your competition portfolio by adding your first hackathon or event participation.
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