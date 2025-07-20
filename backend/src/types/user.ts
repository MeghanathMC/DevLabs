export interface UserProfile {
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
}

export interface UserSettings {
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
}

export interface UserPreferences {
  emailNotifications: boolean;
  publicProfile: boolean;
  showEmail: boolean;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  university?: string;
  graduationYear?: number;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    twitter?: string;
  };
}

export interface UpdateSettingsRequest {
  portfolioSlug?: string;
  isPublic?: boolean;
  theme?: 'modern' | 'professional' | 'creative' | 'minimal';
  customization?: {
    primaryColor?: string;
    secondaryColor?: string;
    font?: string;
    showSection?: {
      about?: boolean;
      projects?: boolean;
      achievements?: boolean;
      skills?: boolean;
      contact?: boolean;
    };
  };
}

export interface UserResponse {
  id: string;
  email: string;
  profile: UserProfile;
  settings: UserSettings;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
} 