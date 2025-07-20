import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  LinkIcon,
  CalendarIcon,
  TrophyIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const PublicPortfolio: React.FC = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  // Mock portfolio data
  const portfolioData = {
    user: {
      firstName: 'Alex',
      lastName: 'Chen',
      bio: 'Full-stack developer passionate about creating innovative solutions at hackathons. I love building applications that solve real-world problems and have a positive impact on communities.',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      location: 'San Francisco, CA',
      email: 'alex.chen@example.com',
      website: 'https://alexchen.dev',
      github: 'https://github.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen'
    },
    projects: [
      {
        id: '1',
        title: 'EcoTracker',
        shortDescription: 'A mobile app for tracking personal carbon footprint',
        description: 'EcoTracker helps users monitor their daily activities and calculate their environmental impact. Features include activity logging, carbon footprint visualization, and eco-friendly suggestions.',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Chart.js'],
        category: 'Mobile App',
        status: 'completed',
        images: [
          'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600',
          'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        links: {
          github: 'https://github.com/user/ecotracker',
          demo: 'https://ecotracker-demo.vercel.app',
          devpost: 'https://devpost.com/software/ecotracker'
        },
        hackathon: {
          name: 'EcoHack 2024',
          date: new Date('2024-03-15'),
          location: 'San Francisco, CA'
        },
        achievements: ['1st Place Winner', 'Best Environmental Impact Award'],
        featured: true
      },
      {
        id: '2',
        title: 'HealthBridge',
        shortDescription: 'Connecting patients with healthcare providers remotely',
        description: 'HealthBridge is a telemedicine platform that enables secure video consultations between patients and healthcare providers.',
        technologies: ['React', 'Express.js', 'PostgreSQL', 'WebRTC'],
        category: 'Web App',
        status: 'completed',
        images: [
          'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        links: {
          github: 'https://github.com/user/healthbridge',
          demo: 'https://healthbridge-demo.herokuapp.com'
        },
        hackathon: {
          name: 'HealthTech Hackathon 2024',
          date: new Date('2024-02-10'),
          location: 'Boston, MA'
        },
        achievements: ['2nd Place Winner'],
        featured: false
      }
    ],
    achievements: [
      {
        id: '1',
        type: 'award',
        title: 'Best Environmental Impact Award',
        issuer: 'EcoHack 2024',
        date: new Date('2024-03-15'),
        category: 'Hackathon'
      },
      {
        id: '2',
        type: 'certificate',
        title: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: new Date('2024-02-01'),
        category: 'Cloud Computing'
      }
    ],
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL']
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <LoadingSpinner variant="skeleton" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary shadow-sm border-b border-indigo-500/20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={portfolioData.user.avatar}
              alt={portfolioData.user.firstName}
              className="h-32 w-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-text-primary mb-2">
                {portfolioData.user.firstName} {portfolioData.user.lastName}
              </h1>
              <p className="text-lg text-text-secondary mb-4 max-w-2xl">
                {portfolioData.user.bio}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-text-tertiary">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {portfolioData.user.location}
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  <a href={`mailto:${portfolioData.user.email}`} className="hover:text-indigo-400">
                    {portfolioData.user.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <a href={portfolioData.user.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                    Portfolio Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Featured Projects */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Featured Projects</h2>
          <div className="space-y-8">
            {portfolioData.projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="bg-bg-secondary rounded-xl shadow-sm border border-indigo-500/20 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-400">
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="text-text-secondary mb-4">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Hackathon Info */}
                    {project.hackathon && (
                      <div className="flex items-center text-sm text-text-tertiary mb-4">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span className="font-medium">{project.hackathon.name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(project.hackathon.date).toLocaleDateString()}</span>
                      </div>
                    )}

                    {/* Achievements */}
                    {project.achievements.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.achievements.map((achievement, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-500/10 text-amber-400"
                          >
                            <TrophyIcon className="h-4 w-4 mr-1" />
                            {achievement}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex space-x-4">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 font-medium"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-text-primary font-medium"
                        >
                          GitHub
                        </a>
                      )}
                      {project.links.devpost && (
                        <a
                          href={project.links.devpost}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 font-medium"
                        >
                          Devpost
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.projects.map((project) => (
              <div key={project.id} className="bg-bg-secondary rounded-xl shadow-sm border border-indigo-500/20 overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h3>
                  <p className="text-text-secondary text-sm mb-4">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-500/10 text-indigo-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {project.status}
                    </span>
                    <div className="flex space-x-2">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                        >
                          Demo
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-text-primary text-sm font-medium"
                        >
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Technologies */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Skills & Technologies</h2>
          <div className="bg-bg-secondary rounded-xl shadow-sm border border-indigo-500/20 p-6">
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-bg-tertiary text-text-primary hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Achievements</h2>
          <div className="space-y-4">
            {portfolioData.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-bg-secondary rounded-xl shadow-sm border border-indigo-500/20 p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    achievement.type === 'award' 
                      ? 'bg-amber-500/10 text-amber-400' 
                      : 'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {achievement.type === 'award' ? (
                      <TrophyIcon className="h-6 w-6" />
                    ) : (
                      <StarIcon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary">{achievement.title}</h3>
                    <p className="text-text-secondary">{achievement.issuer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-text-tertiary">{achievement.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-bg-tertiary text-text-primary py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-4">
            © 2024 {portfolioData.user.firstName} {portfolioData.user.lastName}. 
            Portfolio built with <span className="text-indigo-400">HackFolio</span>.
          </p>
          <div className="flex justify-center space-x-6">
            <a href={portfolioData.user.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              GitHub
            </a>
            <a href={portfolioData.user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              LinkedIn
            </a>
            <a href={portfolioData.user.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              Website
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};