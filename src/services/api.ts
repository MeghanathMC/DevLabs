import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  async login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(userData: any) {
    try {
      const response = await api.post('/auth/register', userData);
      const { user, token } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  async verifyToken() {
    try {
      const response = await api.get('/auth/verify');
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token verification failed');
    }
  },
};

export const projectsAPI = {
  async getProjects() {
    try {
      const response = await api.get('/projects');
      return response.data.projects;
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  async createProject(projectData: any) {
    try {
      const response = await api.post('/projects', projectData);
      return response.data.project;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create project');
    }
  },

  async updateProject(id: string, projectData: any) {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data.project;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update project');
    }
  },

  async deleteProject(id: string) {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete project');
    }
  },
};

export const competitionsAPI = {
  async getCompetitions() {
    try {
      const response = await api.get('/competitions');
      return response.data.competitions;
    } catch (error: any) {
      console.error('Error fetching competitions:', error);
      return [];
    }
  },

  async createCompetition(competitionData: any) {
    try {
      const response = await api.post('/competitions', competitionData);
      return response.data.competition;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create competition');
    }
  },

  async updateCompetition(id: string, competitionData: any) {
    try {
      const response = await api.put(`/competitions/${id}`, competitionData);
      return response.data.competition;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update competition');
    }
  },

  async deleteCompetition(id: string) {
    try {
      const response = await api.delete(`/competitions/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete competition');
    }
  },
};

export const achievementsAPI = {
  async getAchievements() {
    try {
      const response = await api.get('/achievements');
      return response.data.achievements;
    } catch (error: any) {
      console.error('Error fetching achievements:', error);
      return [];
    }
  },

  async createAchievement(achievementData: any) {
    try {
      const response = await api.post('/achievements', achievementData);
      return response.data.achievement;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create achievement');
    }
  },

  async updateAchievement(id: string, achievementData: any) {
    try {
      const response = await api.put(`/achievements/${id}`, achievementData);
      return response.data.achievement;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update achievement');
    }
  },

  async deleteAchievement(id: string) {
    try {
      const response = await api.delete(`/achievements/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete achievement');
    }
  },
};

export const analyticsAPI = {
  async getDashboardStats() {
    try {
      const response = await api.get('/analytics/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      // Return default stats if API fails
    return {
        totalProjects: 0,
        completedProjects: 0,
        ongoingProjects: 0,
        totalAchievements: 0,
        portfolioViews: 0,
        githubStars: 0,
        hackathonsAttended: 0,
        awardsWon: 0,
        monthlyViews: [],
        topTechnologies: []
      };
    }
  },
};

// User API
export const userAPI = {
  async updateProfile(userData: any) {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data.user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  async changePassword(currentPassword: string, newPassword: string) {
    try {
      const response = await api.put('/users/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },
};

// Portfolio API
export const portfolioAPI = {
  async getPortfolio(slug: string) {
    try {
      const response = await api.get(`/portfolio/${slug}`);
      return response.data.portfolio;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch portfolio');
    }
  },

  async updatePortfolioSettings(settings: any) {
    try {
      const response = await api.put('/portfolio/settings', settings);
      return response.data.settings;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update portfolio settings');
    }
  },
};