import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  FolderIcon, 
  TrophyIcon, 
  EyeIcon, 
  StarIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { analyticsAPI, projectsAPI, achievementsAPI } from '../services/api';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/button';
import { FeatureCard } from '../components/ui/grid-feature-cards';

interface DashboardStats {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  totalAchievements: number;
  portfolioViews: number;
  githubStars: number;
  hackathonsAttended: number;
  awardsWon: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, projectsData, achievementsData] = await Promise.all([
          analyticsAPI.getDashboardStats(),
          projectsAPI.getProjects(),
          achievementsAPI.getAchievements()
        ]);
        
        setStats(statsData);
        setRecentProjects(projectsData.slice(0, 3));
        setRecentAchievements(achievementsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !stats) {
    return (
      <LoadingSpinner variant="skeleton" />
    );
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderIcon,
      color: 'bg-indigo-500',
      href: '/app/projects'
    },
    {
      title: 'Achievements',
      value: stats.totalAchievements,
      icon: TrophyIcon,
      color: 'bg-amber-500',
      href: '/app/achievements'
    },
    {
      title: 'Portfolio Views',
      value: stats.portfolioViews.toLocaleString(),
      icon: EyeIcon,
      color: 'bg-emerald-500',
      href: '/app/analytics'
    },
    {
      title: 'GitHub Stars',
      value: stats.githubStars,
      icon: StarIcon,
      color: 'bg-cyan-500',
      href: '/app/analytics'
    }
  ];

  const quickActions = [
    {
      title: 'Add Project',
      icon: FolderIcon,
      description: 'Showcase your work',
      href: '/app/projects'
    },
    {
      title: 'Record Event',
      icon: CalendarIcon,
      description: 'Track participation',
      href: '/app/competitions'
    },
    {
      title: 'Add Certificate',
      icon: TrophyIcon,
      description: 'Upload achievements',
      href: '/app/achievements'
    },
    {
      title: 'View Portfolio',
      icon: DocumentIcon,
      description: 'Public showcase',
      href: '/app/portfolio'
    }
  ];
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div>
          <h1 className="text-h1 text-text-primary">Dashboard</h1>
          <p className="mt-2 text-body text-text-secondary">Your central hub for projects, competitions, and achievements.</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link to="/app/competitions" className="flex-1 sm:flex-none">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              <PlusIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Competition</span>
              <span className="sm:hidden">Competition</span>
            </Button>
          </Link>
          <Link to="/app/projects" className="flex-1 sm:flex-none">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              <PlusIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Project</span>
              <span className="sm:hidden">Project</span>
            </Button>
          </Link>
          <Link to="/app/achievements" className="flex-1 sm:flex-none">
            <Button size="sm" className="w-full sm:w-auto">
              <TrophyIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Achievement</span>
              <span className="sm:hidden">Achievement</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <AnimatedContainer className="grid-responsive">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.href}>
            <FeatureCard feature={action} className="h-full cursor-pointer touch-target-enhanced" />
          </Link>
        ))}
      </AnimatedContainer>

      {/* Stats Grid */}
      <AnimatedContainer delay={0.2} className="grid-responsive">
        {statCards.map((stat, index) => (
          <Link key={index} to={stat.href}>
            <FeatureCard 
              feature={{
                title: stat.title,
                icon: stat.icon,
                description: stat.value.toString()
              }}
              className="h-full cursor-pointer group bg-bg-secondary border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 touch-target-enhanced"
            >
              <div className="flex flex-col items-center text-center p-3 sm:p-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color} bg-opacity-10 mb-2 sm:mb-3`}>
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color.replace('bg-', 'text-')} group-hover:text-indigo-400 transition-colors`} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-text-tertiary mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-indigo-400 transition-colors">
                  {stat.value}
                </p>
              </div>
            </FeatureCard>
          </Link>
        ))}
      </AnimatedContainer>

      {/* Progress Tracking */}
      <div className="card">
        <div className="p-6 border-b border-indigo-500/20">
          <h2 className="text-h4 text-text-primary">Portfolio Completion</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { task: 'Complete Profile', completed: true, description: 'Add bio, skills, and contact info' },
              { task: 'Add First Project', completed: recentProjects.length > 0, description: 'Showcase your best work' },
              { task: 'Upload Achievement', completed: recentAchievements.length > 0, description: 'Add certificates or awards' },
              { task: 'Create Portfolio', completed: false, description: 'Generate your public portfolio' },
              { task: 'Share Portfolio', completed: false, description: 'Make your portfolio public' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.completed ? 'bg-emerald-500' : 'bg-bg-tertiary border-2 border-indigo-500/30'
                }`}>
                  {item.completed && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${item.completed ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {item.task}
                  </p>
                  <p className="text-sm text-text-tertiary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Projects */}
        <div className="card">
          <div className="p-6 border-b border-indigo-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-text-primary">Recent Projects</h2>
              <Link 
                to="/app/projects" 
                className="text-indigo-400 hover:text-indigo-500 text-sm font-medium transition-colors duration-200"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center space-x-4">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {project.title}
                  </p>
                  <p className="text-sm text-text-tertiary">{project.category}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project.status === 'completed' 
                    ? 'success-state' 
                    : 'warning-state'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="card">
          <div className="p-6 border-b border-indigo-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-h4 text-text-primary">Recent Achievements</h2>
              <Link 
                to="/app/achievements" 
                className="text-indigo-400 hover:text-indigo-500 text-sm font-medium transition-colors duration-200"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  achievement.type === 'award' 
                    ? 'bg-amber-500/10' 
                    : achievement.type === 'certificate'
                    ? 'bg-cyan-500/10'
                    : 'bg-emerald-500/10'
                }`}>
                  <TrophyIcon className={`h-5 w-5 ${
                    achievement.type === 'award' 
                      ? 'text-amber-500' 
                      : achievement.type === 'certificate'
                      ? 'text-cyan-500'
                      : 'text-emerald-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-text-tertiary">{achievement.issuer}</p>
                </div>
                <p className="text-xs text-text-tertiary">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-500 to-rose-500 rounded-lg sm:rounded-xl p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div>
            <h3 className="text-h4 mb-2">Ready to showcase your work?</h3>
            <p className="text-indigo-100 text-sm sm:text-base">
              Create a stunning portfolio that highlights your best projects and achievements.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Link to="/app/portfolio" className="block">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-indigo-600 border-white hover:bg-gray-50 touch-target-large">
                Customize Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}