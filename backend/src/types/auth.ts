export interface JWTPayload {
  userId: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  message: string;
  user: {
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
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
} 