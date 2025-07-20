// Core type definitions aligned with PRD

export interface User {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    location?: string;
    university?: string;
    graduationYear?: number;
    skills: string[];
    socialLinks: {
      github?: string;
      linkedin?: string;
      portfolio?: string;
      twitter?: string;
    };
  };
  settings: {
    portfolioSlug: string;
    isPublic: boolean;
    theme: 'modern' | 'professional' | 'creative' | 'minimal';
    customization: {
      primaryColor: string;
      secondaryColor: string;
      font: string;
      showSection: {
        about: boolean;
        projects: boolean;
        achievements: boolean;
        skills: boolean;
        contact: boolean;
      };
    };
  };
  preferences: {
    emailNotifications: boolean;
    publicProfile: boolean;
    showEmail: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'blockchain' | 'iot' | 'game' | 'other';
  status: 'completed' | 'ongoing' | 'abandoned';
  images: string[];
  videos?: string[];
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
    youtube?: string;
    slides?: string;
  };
  hackathon?: {
    name: string;
    date: Date;
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
  metrics: {
    views: number;
    likes: number;
    githubStars?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
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
  projectId?: string; // Link to related project
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  id: string;
  userId: string;
  portfolioViews: Array<{
    date: Date;
    views: number;
    uniqueVisitors: number;
    referrer?: string;
    location?: string;
  }>;
  projectViews: Array<{
    projectId: string;
    date: Date;
    views: number;
  }>;
  skillsProgress: Array<{
    skill: string;
    proficiency: number;
    lastUsed: Date;
    projectCount: number;
  }>;
  goals: Array<{
    title: string;
    description: string;
    targetDate: Date;
    completed: boolean;
    progress: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioSettings {
  theme: 'modern' | 'professional' | 'creative' | 'minimal';
  customization: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
    showSection: {
      about: boolean;
      projects: boolean;
      achievements: boolean;
      skills: boolean;
      contact: boolean;
    };
  };
  isPublic: boolean;
  portfolioSlug: string;
}