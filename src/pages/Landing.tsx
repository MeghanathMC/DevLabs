import React from 'react';
import { Link } from 'react-router-dom';
import FeaturesSectionDemo from '../components/ui/FeaturesSectionDemo';
import { FloatingNav } from '../components/ui/FloatingNav';
import ModernHeroSection from '../components/ui/ModernHeroSection';
import { FooterSection } from '../components/ui/footer-section';
import { CTASection } from '../components/ui/cta-with-rectangle';
import { 
  HomeIcon, 
  FolderIcon, 
  TrophyIcon, 
  DocumentIcon,
  UserIcon 
} from '@heroicons/react/24/outline';

export const Landing: React.FC = () => {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <HomeIcon className="h-4 w-4 text-text-secondary" />,
    },
    {
      name: "Features",
      link: "#features",
      icon: <FolderIcon className="h-4 w-4 text-text-secondary" />,
    },
    {
      name: "Portfolio",
      link: "/portfolio/demo",
      icon: <DocumentIcon className="h-4 w-4 text-text-secondary" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <UserIcon className="h-4 w-4 text-text-secondary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary">
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section */}
      <section id="home" className="pt-20">
        <ModernHeroSection />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-text-primary mb-4">
              Everything You Need to Showcase Your Work
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              From project documentation to professional portfolios, we've got all the tools 
              you need to present your hackathon journey.
            </p>
          </div>
          
          <FeaturesSectionDemo />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-text-primary mb-4">
              About DevLabs
            </h2>
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
              DevLabs is a comprehensive portfolio platform designed specifically for developers 
              who want to showcase their hackathon projects, achievements, and technical skills 
              in a professional and engaging way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-bg-secondary rounded-xl border border-indigo-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Hackathon Focused</h3>
              <p className="text-text-secondary">
                Built specifically for hackathon participants to showcase their projects, 
                team collaborations, and achievements.
              </p>
            </div>
            
            <div className="text-center p-6 bg-bg-secondary rounded-xl border border-indigo-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Professional Portfolios</h3>
              <p className="text-text-secondary">
                Generate beautiful, customizable portfolios that stand out to recruiters 
                and showcase your technical skills effectively.
              </p>
            </div>
            
            <div className="text-center p-6 bg-bg-secondary rounded-xl border border-indigo-500/20">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Rich Project Showcase</h3>
              <p className="text-text-secondary">
                Display your projects with rich media, tech stacks, team information, 
                and detailed descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        badge={{
          text: "DevLabs"
        }}
        title="Ready to Build Your Portfolio?"
        description="Join thousands of developers who are showcasing their hackathon projects and landing their dream jobs."
        action={{
          text: "Get Started for Free",
          href: "/register",
          variant: "default"
        }}
        className="py-20 bg-gradient-to-r from-indigo-500 to-rose-500"
      />

      {/* Footer */}
      <FooterSection />
    </div>
  );
};