{imageError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <PhotoIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export { OptimizedImage };
```

### **3. Advanced State Management**
```typescript
// ✅ Context + Reducer pattern for complex state
interface AppState {
  user: User | null;
  projects: Project[];
  achievements: Achievement[];
  portfolio: PortfolioSettings | null;
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
    loading: Record<string, boolean>;
    errors: Record<string, string>;
  };
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; updates: Partial<Project> } }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_LOADING'; payload: { key: string; loading: boolean } }
  | { type: 'SET_ERROR'; payload: { key: string; error: string | null } }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const initialState: AppState = {
  user: null,
  projects: [],
  achievements: [],
  portfolio: null,
  ui: {
    theme: 'light',
    sidebarOpen: true,
    loading: {},
    errors: {},
  },
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    
    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects] };
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.updates }
            : project
        ),
      };
    
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: {
            ...state.ui.loading,
            [action.payload.key]: action.payload.loading,
          },
        },
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: {
            ...state.ui.errors,
            [action.payload.key]: action.payload.error || '',
          },
        },
      };
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
      };
    
    case 'SET_THEME':
      return {
        ...state,
        ui: { ...state.ui, theme: action.payload },
      };
    
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', state.ui.theme);
    document.documentElement.classList.toggle('dark', state.ui.theme === 'dark');
  }, [state.ui.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
};

// Specialized hooks for specific state slices
export const useProjects = () => {
  const { state, dispatch } = useAppState();
  
  const addProject = useCallback((project: Project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project });
  }, [dispatch]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, updates } });
  }, [dispatch]);

  const deleteProject = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
  }, [dispatch]);

  return {
    projects: state.projects,
    addProject,
    updateProject,
    deleteProject,
  };
};
```

---

## 🧪 **TESTING STRATEGY**

### **1. Component Testing**
```typescript
// ✅ Comprehensive component testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ProjectCard } from '@/components/features/projects/ProjectCard';
import { mockProject } from '@/test-utils/mocks';

const defaultProps = {
  project: mockProject,
  onUpdate: vi.fn(),
  onDelete: vi.fn(),
};

const renderProjectCard = (props = {}) => {
  const mergedProps = { ...defaultProps, ...props };
  return render(<ProjectCard {...mergedProps} />);
};

describe('ProjectCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project information correctly', () => {
    renderProjectCard();
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.shortDescription)).toBeInTheDocument();
    expect(screen.getByText(mockProject.category)).toBeInTheDocument();
    
    // Check if technologies are rendered
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('handles edit action correctly', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    
    renderProjectCard({ onUpdate });
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);
    
    expect(onUpdate).toHaveBeenCalledWith(mockProject);
  });

  it('handles delete action with confirmation', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    
    // Mock window.confirm
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    
    renderProjectCard({ onDelete });
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this project?');
    expect(onDelete).toHaveBeenCalledWith(mockProject.id);
    
    confirmSpy.mockRestore();
  });

  it('does not delete when confirmation is cancelled', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
    
    renderProjectCard({ onDelete });
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(confirmSpy).toHaveBeenCalled();
    expect(onDelete).not.toHaveBeenCalled();
    
    confirmSpy.mockRestore();
  });

  it('renders featured badge when project is featured', () => {
    const featuredProject = { ...mockProject, featured: true };
    renderProjectCard({ project: featuredProject });
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('handles missing optional data gracefully', () => {
    const projectWithoutOptionals = {
      ...mockProject,
      hackathon: undefined,
      links: {},
      achievements: [],
    };
    
    expect(() => renderProjectCard({ project: projectWithoutOptionals })).not.toThrow();
  });

  it('has proper accessibility attributes', () => {
    renderProjectCard();
    
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', expect.stringContaining(mockProject.title));
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toHaveAttribute('aria-label', 'Edit project');
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toHaveAttribute('aria-label', 'Delete project');
  });
});
```

### **2. Custom Hook Testing**
```typescript
// ✅ Custom hook testing
import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useProjects } from '@/hooks/useProjects';
import { projectsService } from '@/services/projects';
import { mockProjects } from '@/test-utils/mocks';

// Mock the service
vi.mock('@/services/projects');

const mockedProjectsService = vi.mocked(projectsService);

describe('useProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches projects on mount', async () => {
    mockedProjectsService.getProjects.mockResolvedValue({
      data: mockProjects,
      pagination: { page: 1, limit: 10, total: 2, pages: 1 },
    });

    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toEqual(mockProjects);
    expect(mockedProjectsService.getProjects).toHaveBeenCalledTimes(1);
  });

  it('handles create project', async () => {
    const newProject = mockProjects[0];
    mockedProjectsService.createProject.mockResolvedValue(newProject);

    const { result } = renderHook(() => useProjects());

    await act(async () => {
      const createdProject = await result.current.createProject({
        title: 'New Project',
        shortDescription: 'Description',
        description: 'Long description',
        technologies: ['React'],
        category: 'web',
      });
      
      expect(createdProject).toEqual(newProject);
    });

    expect(mockedProjectsService.createProject).toHaveBeenCalledWith({
      title: 'New Project',
      shortDescription: 'Description',
      description: 'Long description',
      technologies: ['React'],
      category: 'web',
    });
  });

  it('handles service errors gracefully', async () => {
    const errorMessage = 'Failed to fetch projects';
    mockedProjectsService.getProjects.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProjects());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.projects).toEqual([]);
  });

  it('refetches when filters change', async () => {
    const filters = { category: 'web' as const };
    
    mockedProjectsService.getProjects.mockResolvedValue({
      data: [],
      pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    });

    const { rerender } = renderHook(
      ({ filters }) => useProjects(filters),
      { initialProps: { filters: undefined } }
    );

    expect(mockedProjectsService.getProjects).toHaveBeenCalledTimes(1);

    rerender({ filters });

    await waitFor(() => {
      expect(mockedProjectsService.getProjects).toHaveBeenCalledTimes(2);
    });

    expect(mockedProjectsService.getProjects).toHaveBeenLastCalledWith(filters);
  });
});
```

### **3. Integration Testing**
```typescript
// ✅ Integration testing for user workflows
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Projects } from '@/pages/projects/Projects';
import { AuthProvider } from '@/contexts/AuthContext';
import { mockUser, mockProjects } from '@/test-utils/mocks';
import { projectsService } from '@/services/projects';

// Mock services
vi.mock('@/services/projects');
const mockedProjectsService = vi.mocked(projectsService);

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('Projects Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedProjectsService.getProjects.mockResolvedValue({
      data: mockProjects,
      pagination: { page: 1, limit: 10, total: 2, pages: 1 },
    });
  });

  it('allows user to create a new project', async () => {
    const user = userEvent.setup();
    const newProject = { ...mockProjects[0], id: 'new-project-id' };
    
    mockedProjectsService.createProject.mockResolvedValue(newProject);

    render(<Projects />, { wrapper: TestWrapper });

    // Wait for initial projects to load
    await waitFor(() => {
      expect(screen.getByText(mockProjects[0].title)).toBeInTheDocument();
    });

    // Click create project button
    const createButton = screen.getByRole('button', { name: /create project/i });
    await user.click(createButton);

    // Fill out the form
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const categorySelect = screen.getByLabelText(/category/i);

    await user.type(titleInput, 'My New Project');
    await user.type(descriptionInput, 'This is a new project description');
    await user.selectOptions(categorySelect, 'web');

    // Add technologies
    const techInput = screen.getByLabelText(/technologies/i);
    await user.type(techInput, 'React');
    await user.keyboard('{Enter}');
    await user.type(techInput, 'TypeScript');
    await user.keyboard('{Enter}');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);

    // Verify the project was created
    await waitFor(() => {
      expect(mockedProjectsService.createProject).toHaveBeenCalledWith({
        title: 'My New Project',
        shortDescription: 'This is a new project description',
        description: 'This is a new project description',
        technologies: ['React', 'TypeScript'],
        category: 'web',
        status: 'completed',
        images: [],
        links: {},
        team: [],
        achievements: [],
        tags: [],
        featured: false,
      });
    });

    // Verify the new project appears in the list
    expect(screen.getByText('My New Project')).toBeInTheDocument();
  });

  it('handles form validation errors', async () => {
    const user = userEvent.setup();

    render(<Projects />, { wrapper: TestWrapper });

    // Click create project button
    const createButton = screen.getByRole('button', { name: /create project/i });
    await user.click(createButton);

    // Try to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });

    // Service should not be called
    expect(mockedProjectsService.createProject).not.toHaveBeenCalled();
  });

  it('allows filtering projects by category', async () => {
    const user = userEvent.setup();

    render(<Projects />, { wrapper: TestWrapper });

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText(mockProjects[0].title)).toBeInTheDocument();
    });

    // Filter by web category
    const categoryFilter = screen.getByLabelText(/filter by category/i);
    await user.selectOptions(categoryFilter, 'web');

    // Verify filter was applied
    await waitFor(() => {
      expect(mockedProjectsService.getProjects).toHaveBeenCalledWith(
        expect.objectContaining({ category: 'web' })
      );
    });
  });
});
```

---

## 📊 **MONITORING & ANALYTICS**

### **1. Performance Monitoring**
```typescript
// ✅ Performance monitoring and reporting
interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Web Vitals monitoring
    if ('web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(this.onCLS.bind(this));
        getFID(this.onFID.bind(this));
        getFCP(this.onFCP.bind(this));
        getLCP(this.onLCP.bind(this));
        getTTFB(this.onTTFB.bind(this));
      });
    }

    // Navigation timing
    if ('performance' in window && 'navigation' in performance) {
      window.addEventListener('load', this.onPageLoad.bind(this));
    }
  }

  private onCLS(metric: any) {
    this.metrics.cumulativeLayoutShift = metric.value;
    this.reportMetric('CLS', metric.value);
  }

  private onFID(metric: any) {
    this.metrics.firstInputDelay = metric.value;
    this.reportMetric('FID', metric.value);
  }

  private onFCP(metric: any) {
    this.metrics.firstContentfulPaint = metric.value;
    this.reportMetric('FCP', metric.value);
  }

  private onLCP(metric: any) {
    this.metrics.largestContentfulPaint = metric.value;
    this.reportMetric('LCP', metric.value);
  }

  private onTTFB(metric: any) {
    this.reportMetric('TTFB', metric.value);
  }

  private onPageLoad() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      this.reportMetric('PageLoad', this.metrics.pageLoadTime);
    }
  }

  private reportMetric(name: string, value: number) {
    // Report to analytics service
    if (import.meta.env.PROD) {
      // Example: Send to Google Analytics, DataDog, or custom analytics
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        page_path: window.location.pathname,
      });
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log(`Performance Metric - ${name}: ${Math.round(value)}ms`);
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

### **2. Error Tracking**
```typescript
// ✅ Comprehensive error tracking
interface ErrorInfo {
  error: Error;
  errorInfo?: React.ErrorInfo;
  userId?: string;
  sessionId: string;
  timestamp: number;
  url: string;
  userAgent: string;
  stackTrace?: string;
  context?: Record<string, any>;
}

class ErrorTracker {
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupGlobalErrorHandlers();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupGlobalErrorHandlers() {
    // Catch unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError(event.error, {
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError(new Error(event.reason), {
        context: { type: 'unhandled_promise_rejection' },
      });
    });
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  logError(error: Error, options: { errorInfo?: React.ErrorInfo; context?: Record<string, any> } = {}) {
    const errorInfo: ErrorInfo = {
      error,
      errorInfo: options.errorInfo,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      stackTrace: error.stack,
      context: options.context,
    };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error tracked:', errorInfo);
    }

    // Send to error tracking service in production
    if (import.meta.env.PROD) {
      this.sendToErrorService(errorInfo);
    }
  }

  private async sendToErrorService(errorInfo: ErrorInfo) {
    try {
      // Example: Send to Sentry, LogRocket, or custom error service
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorInfo),
      });
    } catch (sendError) {
      console.error('Failed to send error to tracking service:', sendError);
    }
  }

  logUserAction(action: string, context?: Record<string, any>) {
    if (import.meta.env.PROD) {
      // Track user actions for debugging context
      console.log('User Action:', { action, context, timestamp: Date.now() });
    }
  }
}

export const errorTracker = new ErrorTracker();

// React Error Boundary integration
export const withErrorTracking = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return React.forwardRef<any, P>((props, ref) => (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        errorTracker.logError(error, { errorInfo });
      }}
    >
      <Component {...props} ref={ref} />
    </ErrorBoundary>
  ));
};
```

---

## 🔄 **CI/CD & DEPLOYMENT**

### **1. GitHub Actions Workflow**
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to Vercel Staging
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prebuilt'
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to Vercel Production
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prebuilt --prod'
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📚 **DOCUMENTATION STANDARDS**

### **1. Component Documentation**
```typescript
/**
 * ProjectCard - A reusable card component for displaying project information
 * 
 * @example
 * ```tsx
 * <ProjectCard
 *   project={project}
 *   onUpdate={(project) => handleUpdate(project)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 * 
 * @param project - The project object to display
 * @param onUpdate - Callback fired when the edit button is clicked
 * @param onDelete - Callback fired when the delete button is clicked
 * @param className - Additional CSS classes to apply
 * 
 * @returns A card component displaying the project information
 */
interface ProjectCardProps {
  /** The project data to display */
  project: Project;
  /** Callback function called when the project should be updated */
  onUpdate?: (project: Project) => void;
  /** Callback function called when the project should be deleted */
  onDelete?: (projectId: string) => void;
  /** Additional CSS classes */
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onUpdate,
  onDelete,
  className,
}) => {
  // Component implementation...
};
```

### **2. API Documentation**
```typescript
/**
 * Projects Service
 * 
 * Handles all project-related API operations including CRUD operations,
 * file uploads, and project filtering.
 */
export const projectsService = {
  /**
   * Fetches a paginated list of projects with optional filtering
   * 
   * @param filters - Optional filtering parameters
   * @param filters.search - Search term to filter by title, description, or technologies
   * @param filters.category - Filter by project category
   * @param filters.status - Filter by project status
   * @param filters.featured - Filter by featured status
   * @param filters.page - Page number for pagination (default: 1)
   * @param filters.limit - Number of items per page (default: 10)
   * 
   * @returns Promise resolving to paginated project data
   * 
   * @throws {Error} When the API request fails
   * 
   * @example
   * ```typescript
   * const { data, pagination } = await projectsService.getProjects({
   *   category: 'web',
   *   featured: true,
   *   page: 1,
   *   limit: 20
   * });
   * ```
   */
  async getProjects(
    filters?: ProjectFilters & PaginationParams
  ): Promise<PaginatedResponse<Project>> {
    // Implementation...
  },
};
```

---

## 🎯 **FINAL QUALITY CHECKLIST**

### **Before Every Feature Release:**

#### **Code Quality**
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Components properly typed with interfaces
- [ ] Error boundaries implemented
- [ ] Loading states handled
- [ ] Edge cases considered

#### **Performance**
- [ ] Bundle size optimized
- [ ] Images optimized and lazy loaded
- [ ] Code splitting implemented
- [ ] Memoization applied where appropriate
- [ ] No memory leaks

#### **Accessibility**
- [ ] ARIA labels added
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader tested
- [ ] Focus management implemented
- [ ] Semantic HTML used

#### **Security**
- [ ] Input validation implemented
- [ ] XSS protection in place
- [ ] Authentication tokens secure
- [ ] File upload validation
- [ ] CSRF protection enabled
- [ ] No sensitive data in client-side code

#### **Testing**
- [ ] Unit tests written and passing
- [ ] Integration tests cover user flows
- [ ] Component tests include accessibility
- [ ] Error scenarios tested
- [ ] Edge cases covered
- [ ] Performance tests run

#### **User Experience**
- [ ] Responsive design verified
- [ ] Loading states intuitive
- [ ] Error messages helpful
- [ ] Navigation clear
- [ ] Actions have feedback
- [ ] Form validation user-friendly

#### **Documentation**
- [ ] Component props documented
- [ ] API methods documented
- [ ] README updated
- [ ] Changelog updated
- [ ] Migration guide (if needed)
- [ ] Examples provided

---

## 🚀 **PRODUCTION READINESS**

### **1. Environment Configuration**
```typescript
// ✅ Environment-specific configurations
const config = {
  development: {
    apiUrl: 'http://localhost:5000/api/v1',
    enableLogging: true,
    enableErrorBoundary: true,
    enablePerformanceMonitoring: false,
    enableHotReload: true,
  },
  staging: {
    apiUrl: 'https://api-staging.hackfolio.com/v1',
    enableLogging: true,
    enableErrorBoundary: true,
    enablePerformanceMonitoring: true,
    enableHotReload: false,
  },
  production: {
    apiUrl: 'https://api.hackfolio.com/v1',
    enableLogging: false,
    enableErrorBoundary: true,
    enablePerformanceMonitoring: true,
    enableHotReload: false,
  },
};

export const getConfig = () => {
  const env = import.meta.env.MODE || 'development';
  return config[env as keyof typeof config] || config.development;
};
```

### **2. SEO Optimization**
```typescript
// ✅ SEO-optimized meta tags and structured data
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOProps> = ({
  title = 'HackFolio - Showcase Your Hackathon Projects',
  description = 'Create stunning portfolios to showcase your hackathon projects, achievements, and technical skills. Build your developer brand with HackFolio.',
  keywords = ['hackathon', 'portfolio', 'developer', 'projects', 'showcase'],
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  noIndex = false,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords.join(', '));
    
    // Open Graph
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:image', image);
    updateMeta('og:url', url);
    updateMeta('og:type', type);
    
    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    
    // Robots
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow');
    }

    // Structured data for portfolios
    if (type === 'profile') {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: title,
        description: description,
        image: image,
        url: url,
      };

      let scriptTag = document.querySelector('#structured-data');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, image, url, type, noIndex]);

  return null;
};

export { SEOHead };
```

### **3. Analytics Integration**
```typescript
// ✅ Comprehensive analytics tracking
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class Analytics {
  private isEnabled: boolean;
  private userId?: string;

  constructor() {
    this.isEnabled = import.meta.env.PROD && !!import.meta.env.VITE_GA_TRACKING_ID;
    this.initialize();
  }

  private initialize() {
    if (!this.isEnabled) return;

    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    
    window.gtag('js', new Date());
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  setUserId(userId: string) {
    this.userId = userId;
    if (this.isEnabled) {
      window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        user_id: userId,
      });
    }
  }

  trackEvent({ action, category, label, value, custom_parameters }: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('Analytics Event:', { action, category, label, value, custom_parameters });
      return;
    }

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      user_id: this.userId,
      ...custom_parameters,
    });
  }

  trackPageView(path: string, title?: string) {
    if (!this.isEnabled) return;

    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }

  // Predefined tracking methods for common actions
  trackProjectCreated(projectId: string, category: string) {
    this.trackEvent({
      action: 'project_created',
      category: 'engagement',
      label: category,
      custom_parameters: { project_id: projectId },
    });
  }

  trackPortfolioViewed(portfolioSlug: string) {
    this.trackEvent({
      action: 'portfolio_viewed',
      category: 'engagement',
      label: portfolioSlug,
    });
  }

  trackFeatureUsed(feature: string) {
    this.trackEvent({
      action: 'feature_used',
      category: 'engagement',
      label: feature,
    });
  }

  trackUserRegistration(method: 'email' | 'google' | 'github') {
    this.trackEvent({
      action: 'user_registration',
      category: 'acquisition',
      label: method,
    });
  }

  trackSearch(query: string, results: number) {
    this.trackEvent({
      action: 'search',
      category: 'engagement',
      label: query,
      value: results,
    });
  }
}

export const analytics = new Analytics();

// React hook for tracking page views
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname + location.search);
  }, [location]);
};

// HOC for component-level tracking
export const withAnalytics = <P extends object>(
  Component: React.ComponentType<P>,
  trackingConfig: { category: string; label?: string }
) => {
  return React.forwardRef<any, P>((props, ref) => {
    useEffect(() => {
      analytics.trackEvent({
        action: 'component_viewed',
        category: trackingConfig.category,
        label: trackingConfig.label,
      });
    }, []);

    return <Component {...props} ref={ref} />;
  });
};
```

---

## 🎨 **DESIGN SYSTEM EXCELLENCE**

### **1. Design Token System**
```typescript
// ✅ Systematic design tokens with TypeScript
export const designSystem = {
  colors: {
    // Brand colors
    brand: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#10b981',
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Neutral colors
    neutral: {
      white: '#ffffff',
      gray: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      black: '#000000',
    },
  },
  
  typography: {
    fontFamilies: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  animation: {
    durations: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    
    easings: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Type-safe design token access
export type DesignTokens = typeof designSystem;
export type ColorToken = keyof typeof designSystem.colors.neutral.gray;
export type SpacingToken = keyof typeof designSystem.spacing;
export type FontSizeToken = keyof typeof designSystem.typography.fontSizes;

// Utility function for accessing nested tokens
export const token = {
  color: {
    neutral: (shade: ColorToken) => designSystem.colors.neutral.gray[shade],
    brand: (color: keyof typeof designSystem.colors.brand) => designSystem.colors.brand[color],
    semantic: (color: keyof typeof designSystem.colors.semantic) => designSystem.colors.semantic[color],
  },
  space: (size: SpacingToken) => designSystem.spacing[size],
  fontSize: (size: FontSizeToken) => designSystem.typography.fontSizes[size],
};
```

### **2. Component Variants System**
```typescript
// ✅ Systematic component variants with cva
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/helpers';

// Button component with comprehensive variants
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner className="mr-2 h-4 w-4" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

---

## 🏆 **SENIOR ENGINEER MINDSET**

### **Key Principles to Always Remember:**

#### **1. User-Centric Thinking**
- Every feature decision should improve user experience
- Accessibility is not optional - it's fundamental
- Performance directly impacts user satisfaction
- Error states should be helpful, not frustrating

#### **2. Maintainability First**
- Write code that your future self will thank you for
- Prefer explicit over implicit
- Document complex logic and business rules
- Create reusable, composable components

#### **3. Scalability Considerations**
- Design for growth from day one
- Consider how features will work with 10x more data
- Plan for internationalization and localization
- Think about caching and performance implications

#### **4. Security Mindset**
- Validate everything on both client and server
- Never trust user input
- Implement proper authentication flows
- Regular security audits and updates

#### **5. Team Collaboration**
- Write self-documenting code
- Provide comprehensive code reviews
- Share knowledge through documentation
- Mentor junior developers

#### **6. Continuous Learning**
- Stay updated with React and ecosystem changes
- Learn from other senior engineers and codebases
- Experiment with new patterns and tools
- Attend conferences and read technical blogs

---

## 📋 **FINAL SENIOR ENGINEER CHECKLIST**

### **Before Every Feature:**
- [ ] **Architecture**: Is this the right architectural approach?
- [ ] **Performance**: Will this scale with more users/data?
- [ ] **Security**: Are all inputs validated and sanitized?
- [ ] **Accessibility**: Can all users interact with this?
- [ ] **Testing**: Are all paths and edge cases tested?
- [ ] **Documentation**: Will other developers understand this?
- [ ] **Maintainability**: Is this code easy to modify and extend?
- [ ] **User Experience**: Does this delight or frustrate users?

### **Before Every Release:**
- [ ] **Code Quality**: Clean, well-structured, and documented
- [ ] **Performance**: Fast loading, smooth interactions
- [ ] **Security**: No vulnerabilities or data leaks
- [ ] **Accessibility**: WCAG compliant and tested
- [ ] **Cross-browser**: Works across all target browsers
- [ ] **Mobile**: Responsive and touch-friendly
- [ ] **Error Handling**: Graceful degradation everywhere
- [ ] **Analytics**: Proper tracking for insights

### **Continuous Improvement:**
- [ ] **Refactoring**: Regular code cleanup and optimization
- [ ] **Dependencies**: Keep packages updated and secure
- [ ] **Monitoring**: Track performance and errors in production
- [ ] **User Feedback**: Collect and act on user input
- [ ] **Team Knowledge**: Share learnings and best practices
- [ ] **Innovation**: Explore new technologies and patterns

---

## 🎯 **REMEMBER: YOU'RE BUILDING FOR SCALE**

As a senior engineer, you're not just writing code - you're:

- **Architecting** systems that will serve thousands of users
- **Mentoring** other developers through your code quality
- **Solving** complex problems with elegant solutions
- **Building** features that users will love and rely on
- **Creating** maintainable code that teams can evolve
- **Establishing** patterns that will guide future development

Every line of code you write should reflect this level of responsibility and expertise. Your goal is not just to make it work, but to make it work beautifully, efficiently, and sustainably for years to come.

**Build with pride. Code with purpose. Lead by example.**

🚀 **Now go build something amazing!**# HackFolio - Senior Engineer Guidelines & Best Practices

## 🎯 **ROLE & MINDSET**

As a Senior Frontend/UI/UX Engineer, you are responsible for architecting and building a production-ready, scalable, and maintainable application that could serve thousands of users. Every decision should reflect enterprise-level thinking and industry best practices.

---

## 🏗️ **ARCHITECTURAL PRINCIPLES**

### **1. Scalable Architecture**
```typescript
// ✅ Feature-based folder structure
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── projects/
│   └── portfolio/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
```

### **2. Separation of Concerns**
- **Components**: Pure presentation logic
- **Hooks**: Business logic and state management
- **Services**: API calls and external integrations
- **Utils**: Pure functions and helpers
- **Types**: TypeScript definitions

### **3. Dependency Injection & Inversion**
```typescript
// ✅ Dependency injection pattern
interface ApiClientInterface {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}

class ProjectService {
  constructor(private apiClient: ApiClientInterface) {}
  
  async getProjects(): Promise<Project[]> {
    return this.apiClient.get<Project[]>('/projects');
  }
}
```

---

## 🎨 **UI/UX EXCELLENCE**

### **1. Design System Implementation**
```typescript
// ✅ Systematic approach to design tokens
export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
} as const;
```

### **2. Component Composition Pattern**
```typescript
// ✅ Compound component pattern for flexibility
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, variant = 'default', className, ...props }: CardProps) => {
  const baseClasses = 'rounded-lg transition-all duration-200';
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-300',
    elevated: 'bg-white shadow-lg border-0',
  };

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }: CardHeaderProps) => (
  <div className={cn('px-6 py-4 border-b border-gray-200', className)} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }: CardContentProps) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
);

const CardActions = ({ children, className, ...props }: CardActionsProps) => (
  <div className={cn('px-6 py-4 border-t border-gray-200 flex gap-2', className)} {...props}>
    {children}
  </div>
);

// Compound component export
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Actions = CardActions;

export { Card };

// Usage:
<Card variant="elevated">
  <Card.Header>
    <h3>Project Title</h3>
  </Card.Header>
  <Card.Content>
    <p>Project description...</p>
  </Card.Content>
  <Card.Actions>
    <Button>Edit</Button>
    <Button variant="outline">Delete</Button>
  </Card.Actions>
</Card>
```

### **3. Accessibility-First Development**
```typescript
// ✅ Comprehensive accessibility implementation
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  'aria-label'?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      className={cn(getButtonClasses({ variant, size }), className)}
      disabled={isDisabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner 
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
          className="mr-2"
          aria-hidden="true"
        />
      )}
      {!isLoading && leftIcon && (
        <span className="mr-2" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span>
        {isLoading && loadingText ? loadingText : children}
      </span>
      {!isLoading && rightIcon && (
        <span className="ml-2" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
```

---

## 💻 **ADVANCED REACT PATTERNS**

### **1. Custom Hook Composition**
```typescript
// ✅ Composable hooks for complex state management
interface UseProjectFormOptions {
  projectId?: string;
  onSuccess?: (project: Project) => void;
  onError?: (error: string) => void;
}

export const useProjectForm = ({ projectId, onSuccess, onError }: UseProjectFormOptions = {}) => {
  const { project, loading: projectLoading } = useProject(projectId);
  const { createProject, updateProject } = useProjects();
  const { uploadImages } = useFileUpload();

  const form = useForm<CreateProjectData>({
    resolver: yupResolver(projectSchema),
    defaultValues: useMemo(() => ({
      title: project?.title || '',
      shortDescription: project?.shortDescription || '',
      description: project?.description || '',
      technologies: project?.technologies || [],
      category: project?.category || 'web',
      status: project?.status || 'completed',
      images: project?.images || [],
      links: project?.links || {},
      hackathon: project?.hackathon || undefined,
      team: project?.team || [],
      achievements: project?.achievements || [],
      tags: project?.tags || [],
      featured: project?.featured || false,
    }), [project]),
  });

  // Reset form when project data changes
  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title,
        shortDescription: project.shortDescription,
        description: project.description,
        technologies: project.technologies,
        category: project.category,
        status: project.status,
        images: project.images,
        links: project.links,
        hackathon: project.hackathon,
        team: project.team,
        achievements: project.achievements,
        tags: project.tags,
        featured: project.featured,
      });
    }
  }, [project, form]);

  const handleImageUpload = async (files: FileList) => {
    try {
      const uploadedImages = await uploadImages(files);
      const currentImages = form.getValues('images') || [];
      form.setValue('images', [...currentImages, ...uploadedImages]);
      return uploadedImages;
    } catch (error) {
      onError?.('Failed to upload images');
      throw error;
    }
  };

  const onSubmit = async (data: CreateProjectData) => {
    try {
      let result: Project;
      
      if (projectId) {
        result = await updateProject(projectId, data);
      } else {
        result = await createProject(data);
      }

      if (result) {
        onSuccess?.(result);
        return result;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      onError?.(errorMessage);
      throw error;
    }
  };

  return {
    form,
    project,
    isLoading: projectLoading,
    isEditing: !!projectId,
    handleImageUpload,
    onSubmit: form.handleSubmit(onSubmit),
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    isSubmitting: form.formState.isSubmitting,
  };
};
```

### **2. Error Boundary Implementation**
```typescript
// ✅ Comprehensive error boundary with recovery
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  retry: () => void;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service
    this.props.onError?.(error, errorInfo);
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  retry = () => {
    this.resetError();
    // Force a re-render after a short delay
    this.retryTimeoutId = window.setTimeout(() => {
      this.forceUpdate();
    }, 100);
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          resetError={this.resetError}
          retry={this.retry}
        />
      );
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError, retry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900">Something went wrong</h3>
        <p className="mt-2 text-sm text-gray-500">
          {error.message || 'An unexpected error occurred'}
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="text-sm text-gray-600 cursor-pointer">Error details</summary>
            <pre className="mt-2 text-xs text-gray-800 bg-gray-100 p-2 rounded overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
      <div className="mt-6 flex space-x-3">
        <Button onClick={retry} className="flex-1">
          Try Again
        </Button>
        <Button variant="outline" onClick={resetError} className="flex-1">
          Go Back
        </Button>
      </div>
    </div>
  </div>
);

export { ErrorBoundary };
```

### **3. Performance Optimization Strategies**
```typescript
// ✅ Memoization and optimization patterns
interface ProjectListProps {
  projects: Project[];
  onProjectUpdate: (project: Project) => void;
  onProjectDelete: (id: string) => void;
  filters: ProjectFilters;
}

const ProjectList = React.memo<ProjectListProps>(({ 
  projects, 
  onProjectUpdate, 
  onProjectDelete, 
  filters 
}) => {
  // Memoize expensive computations
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some(tech => 
            tech.toLowerCase().includes(searchLower)
          )
        );
      }
      return true;
    }).filter(project => {
      if (filters.category) {
        return project.category === filters.category;
      }
      return true;
    }).filter(project => {
      if (filters.status) {
        return project.status === filters.status;
      }
      return true;
    });
  }, [projects, filters]);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleProjectUpdate = useCallback((project: Project) => {
    onProjectUpdate(project);
  }, [onProjectUpdate]);

  const handleProjectDelete = useCallback((id: string) => {
    onProjectDelete(id);
  }, [onProjectDelete]);

  // Virtual scrolling for large lists
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredProjects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // Estimated height of each project card
    overscan: 5,
  });

  if (filteredProjects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="Create your first project to get started"
        action={<Button>Create Project</Button>}
      />
    );
  }

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const project = filteredProjects[virtualItem.index];
          return (
            <div
              key={project.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ProjectCard
                project={project}
                onUpdate={handleProjectUpdate}
                onDelete={handleProjectDelete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

ProjectList.displayName = 'ProjectList';
```

---

## 🔒 **SECURITY & VALIDATION**

### **1. Input Validation & Sanitization**
```typescript
// ✅ Comprehensive validation with Yup
import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const projectSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,!?]+$/, 'Title contains invalid characters'),
  
  shortDescription: yup
    .string()
    .required('Short description is required')
    .max(200, 'Short description must be less than 200 characters'),
  
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  
  technologies: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one technology is required')
    .max(20, 'Maximum 20 technologies allowed'),
  
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['web', 'mobile', 'ai', 'blockchain', 'iot', 'game', 'other']),
  
  status: yup
    .string()
    .oneOf(['completed', 'ongoing', 'abandoned'])
    .default('completed'),
  
  links: yup.object().shape({
    github: yup.string().url('Invalid GitHub URL').nullable(),
    demo: yup.string().url('Invalid demo URL').nullable(),
    devpost: yup.string().url('Invalid Devpost URL').nullable(),
    youtube: yup.string().url('Invalid YouTube URL').nullable(),
    slides: yup.string().url('Invalid slides URL').nullable(),
  }),
  
  hackathon: yup.object().shape({
    name: yup.string().required('Hackathon name is required'),
    date: yup.date().required('Hackathon date is required').max(new Date(), 'Date cannot be in the future'),
    location: yup.string().required('Location is required'),
    duration: yup.string().nullable(),
    organizer: yup.string().nullable(),
    website: yup.string().url('Invalid website URL').nullable(),
  }).nullable(),
  
  team: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Team member name is required'),
      role: yup.string().required('Team member role is required'),
      github: yup.string().url('Invalid GitHub URL').nullable(),
      linkedin: yup.string().url('Invalid LinkedIn URL').nullable(),
    })
  ),
  
  achievements: yup.array().of(yup.string()),
  tags: yup.array().of(yup.string()).max(10, 'Maximum 10 tags allowed'),
  featured: yup.boolean().default(false),
});

// File validation helper
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' };
  }
  
  return { isValid: true };
};

// XSS Prevention utility
export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
  });
};
```

### **2. Secure API Communication**
```typescript
// ✅ Secure API client with request/response interceptors
class SecureApiClient {
  private client: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for authentication and security
    this.client.interceptors.request.use(
      (config) => {
        // Add CSRF token
        const csrfToken = this.getCSRFToken();
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        // Add authentication token
        const tokens = getStoredTokens();
        if (tokens?.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }

        // Add request timestamp for replay attack prevention
        config.headers['X-Request-Time'] = Date.now().toString();

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh and error handling
    this.client.interceptors.response.use(
      (response) => {
        // Update CSRF token if provided
        const newCSRFToken = response.headers['x-csrf-token'];
        if (newCSRFToken) {
          this.setCSRFToken(newCSRFToken);
        }

        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        // Handle rate limiting
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          if (retryAfter) {
            await this.delay(parseInt(retryAfter) * 1000);
            return this.client(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const tokens = getStoredTokens();
        if (!tokens?.refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          refreshToken: tokens.refreshToken,
        });

        const newTokens = response.data.tokens;
        storeTokens(newTokens);

        return newTokens.accessToken;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private handleAuthError() {
    removeStoredTokens();
    window.location.href = '/login';
  }

  private getCSRFToken(): string | null {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || null;
  }

  private setCSRFToken(token: string) {
    let csrfMeta = document.querySelector('meta[name="csrf-token"]');
    if (!csrfMeta) {
      csrfMeta = document.createElement('meta');
      csrfMeta.setAttribute('name', 'csrf-token');
      document.head.appendChild(csrfMeta);
    }
    csrfMeta.setAttribute('content', token);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

export const secureApiClient = new SecureApiClient();
```

---

## 🚀 **PERFORMANCE & OPTIMIZATION**

### **1. Code Splitting & Lazy Loading**
```typescript
// ✅ Route-based code splitting
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui';

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Projects = lazy(() => import('@/pages/projects/Projects'));
const Achievements = lazy(() => import('@/pages/achievements/Achievements'));
const Portfolio = lazy(() => import('@/pages/portfolio/Portfolio'));
const Analytics = lazy(() => import('@/pages/analytics/Analytics'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

// Route configuration with lazy loading
export const AppRoutes = () => (
  <Routes>
    <Route path="/app" element={<Layout />}>
      <Route path="dashboard" element={
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      } />
      <Route path="projects" element={
        <Suspense fallback={<PageLoader />}>
          <Projects />
        </Suspense>
      } />
      <Route path="achievements" element={
        <Suspense fallback={<PageLoader />}>
          <Achievements />
        </Suspense>
      } />
      <Route path="portfolio" element={
        <Suspense fallback={<PageLoader />}>
          <Portfolio />
        </Suspense>
      } />
      <Route path="analytics" element={
        <Suspense fallback={<PageLoader />}>
          <Analytics />
        </Suspense>
      } />
    </Route>
  </Routes>
);
```

### **2. Image Optimization & Loading**
```typescript
// ✅ Progressive image loading with optimization
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+',
  priority = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageRef, inView] = useInView({
    triggerOnce: true,
    skip: priority,
  });

  const shouldLoad = priority || inView;

  const optimizedSrc = useMemo(() => {
    if (!shouldLoad) return placeholder;
    
    // Add image optimization parameters
    const url = new URL(src);
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('f', 'webp');
    url.searchParams.set('q', '85');
    
    return url.toString();
  }, [src, width, height, shouldLoad, placeholder]);

  return (
    <div ref={imageRef} className={className}>
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={cn(
          'transition-opacity duration-300',
          imageLoaded ? 'opacity-100' : 'opacity-0',
          imageError && 'bg-gray-200'
        )}
      />
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {imageError && (
        <div className="absolute inset-0 bg-