export interface ProjectLinks {
  github?: string;
  demo?: string;
  devpost?: string;
  youtube?: string;
  slides?: string;
}

export interface HackathonDetails {
  name: string;
  date: Date;
  location: string;
  duration: string;
  organizer: string;
  website?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
}

export interface ProjectMetrics {
  views: number;
  likes: number;
  githubStars?: number;
}

export interface CreateProjectRequest {
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'blockchain' | 'iot' | 'game' | 'other';
  status?: 'completed' | 'ongoing' | 'abandoned';
  images?: string[];
  videos?: string[];
  links?: ProjectLinks;
  hackathon?: HackathonDetails;
  team?: TeamMember[];
  achievements?: string[];
  tags?: string[];
  featured?: boolean;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}

export interface ProjectResponse {
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
  links: ProjectLinks;
  hackathon?: HackathonDetails;
  team: TeamMember[];
  achievements: string[];
  tags: string[];
  featured: boolean;
  metrics: ProjectMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  technologies?: string[];
}

export interface ProjectPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ProjectsResponse {
  projects: ProjectResponse[];
  pagination: ProjectPagination;
} 