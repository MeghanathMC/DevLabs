export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface SearchParams {
  q?: string;
  category?: string;
  tags?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FileUploadResponse {
  url: string;
  publicId: string;
  format: string;
  bytes: number;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
  timestamp?: string;
}

export interface SuccessResponse<T = any> {
  message: string;
  data?: T;
  timestamp?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationErrorResponse {
  error: string;
  details: ValidationError[];
}

export interface ApiStats {
  totalUsers: number;
  totalProjects: number;
  totalAchievements: number;
  activePortfolios: number;
}

export interface HealthCheckResponse {
  status: 'OK' | 'ERROR';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  database: 'connected' | 'disconnected';
} 