# HackFolio - Hackathon Portfolio Aggregator


## Project Overview


HackFolio is a comprehensive web application designed to help developers showcase their hackathon projects, achievements, and skills through professional portfolios. The platform provides tools for project management, achievement tracking, analytics, and customizable portfolio generation.


## Tech Stack


- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Headless UI
- **Icons**: Heroicons + Lucide React
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form + Yup validation
- **Charts**: Recharts
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Linting**: ESLint + TypeScript ESLint


## Project Structure


```
hackfolio/
├── .bolt/                          # Bolt configuration
│   ├── config.json                 # Bolt template config
│   └── prompt                      # Design guidelines
├── .cursor/                        # Cursor IDE rules
│   └── rules/
│       └── byterover-rules.mdc     # ByteRover MCP instructions
├── .github/                        # GitHub configuration
│   └── copilot-instructions.md     # GitHub Copilot instructions
├── .mcp.json                       # MCP server configuration
├── public/                         # Static assets
├── src/                            # Source code
│   ├── components/                 # Reusable UI components
│   │   ├── auth/                   # Authentication components
│   │   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx          # Application header
│   │   │   ├── Layout.tsx          # Main layout wrapper
│   │   │   └── Sidebar.tsx         # Navigation sidebar
│   │   └── ui/                     # Base UI components
│   │       ├── Button.tsx          # Button component
│   │       ├── Input.tsx           # Input field component
│   │       └── LoadingSpinner.tsx  # Loading indicator
│   ├── contexts/                   # React contexts
│   │   └── AuthContext.tsx         # Authentication state management
│   ├── pages/                      # Page components
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── Login.tsx           # Login page
│   │   │   └── Register.tsx        # Registration page
│   │   ├── Achievements.tsx        # Achievements management
│   │   ├── Analytics.tsx           # Analytics dashboard
│   │   ├── Dashboard.tsx           # Main dashboard
│   │   ├── Landing.tsx             # Landing page
│   │   ├── Portfolio.tsx           # Portfolio customization
│   │   ├── Profile.tsx             # User profile settings
│   │   ├── Projects.tsx            # Projects management
│   │   └── PublicPortfolio.tsx     # Public portfolio view
│   ├── services/                   # API services
│   │   └── api.ts                  # API client and mock data
│   ├── App.tsx                     # Main application component
│   ├── index.css                   # Global styles
│   ├── main.tsx                    # Application entry point
│   └── vite-env.d.ts               # Vite type definitions
├── .gitignore                      # Git ignore rules
├── CLAUDE.md                       # Claude instructions
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── prd.md                          # Project requirements document
├── seniorEngineer.md               # Senior engineer guidelines
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.app.json               # TypeScript app config
├── tsconfig.json                   # TypeScript base config
├── tsconfig.node.json              # TypeScript node config
└── vite.config.ts                  # Vite configuration
```


## Core Features


### 1. Authentication System
- **User Registration**: Email/password registration with validation
- **User Login**: Secure authentication with JWT tokens
- **Protected Routes**: Route protection for authenticated users
- **User Profile**: Profile management and settings


### 2. Project Management
- **Project Creation**: Add new hackathon projects with rich metadata
- **Project Details**:
  - Title, description, technologies used
  - Hackathon information (name, date, location)
  - Team members and roles
  - Project images and links (GitHub, demo, Devpost)
  - Achievement badges and awards
- **Project Status**: Track completion status (completed, ongoing, abandoned)
- **Project Filtering**: Search and filter by technology, status, category
- **Featured Projects**: Highlight best projects


### 3. Achievement Tracking
- **Achievement Types**: Awards, certificates, recognitions, participation
- **Achievement Details**:
  - Title, description, issuer
  - Date and category
  - Certificate URLs and verification links
  - Featured achievements
- **Achievement Management**: Add, edit, delete achievements


### 4. Portfolio Generation
- **Portfolio Templates**: Multiple professional templates
  - Modern: Clean and contemporary design
  - Professional: Business-style layout
  - Creative: Bold and innovative design
  - Minimal: Simple and elegant design
- **Customization Options**:
  - Color schemes
  - Section visibility
  - Layout preferences
- **Portfolio URL**: Custom shareable URLs
- **Export Options**: PDF export functionality


### 5. Analytics Dashboard
- **Portfolio Metrics**:
  - Total views and unique visitors
  - Monthly view trends
  - GitHub stars and project popularity
- **Technology Analytics**: Most used technologies
- **Project Analytics**: Completion rates and status distribution
- **Growth Insights**: Performance recommendations


### 6. Public Portfolio
- **Public View**: Shareable portfolio pages
- **Responsive Design**: Mobile-friendly layouts
- **Rich Content**: Project showcases with images and descriptions
- **Contact Information**: Professional contact details
- **Social Links**: GitHub, LinkedIn, personal website


## Data Models


### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  portfolioSlug?: string;
}
```


### Project
```typescript
interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'ongoing' | 'abandoned';
  images: string[];
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
  };
  hackathon?: {
    name: string;
    date: Date;
    location: string;
  };
  team: Array<{
    name: string;
    role: string;
  }>;
  achievements: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```


### Achievement
```typescript
interface Achievement {
  id: string;
  type: 'certificate' | 'award' | 'participation' | 'recognition';
  title: string;
  description?: string;
  issuer: string;
  date: Date;
  certificateUrl?: string;
  verificationUrl?: string;
  category: string;
  featured: boolean;
}
```


## API Structure


### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/verify` - Token verification


### Projects Endpoints
- `GET /projects` - Get user projects
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project


### Achievements Endpoints
- `GET /achievements` - Get user achievements
- `POST /achievements` - Create new achievement
- `PUT /achievements/:id` - Update achievement
- `DELETE /achievements/:id` - Delete achievement


### Analytics Endpoints
- `GET /analytics/dashboard` - Get dashboard statistics
- `GET /analytics/portfolio/:slug` - Get portfolio analytics


### Portfolio Endpoints
- `GET /portfolio/:slug` - Get public portfolio
- `PUT /portfolio/settings` - Update portfolio settings


## Routing Structure


### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/portfolio/:slug` - Public portfolio view


### Protected Routes (under `/app`)
- `/app/dashboard` - Main dashboard
- `/app/projects` - Projects management
- `/app/achievements` - Achievements management
- `/app/portfolio` - Portfolio customization
- `/app/analytics` - Analytics dashboard
- `/app/profile` - User profile settings


## Development Guidelines


### Code Organization
- **Components**: Reusable UI components in `src/components/`
- **Pages**: Route-specific components in `src/pages/`
- **Services**: API calls and business logic in `src/services/`
- **Contexts**: Global state management in `src/contexts/`


### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Component Variants**: Consistent button, input, and form styles
- **Responsive Design**: Mobile-first approach
- **Design System**: Consistent color scheme and spacing


### State Management
- **React Context**: Global authentication state
- **Local State**: Component-specific state with useState
- **Form State**: React Hook Form for form management


### Error Handling
- **API Errors**: Centralized error handling in services
- **Form Validation**: Yup schema validation
- **Loading States**: Consistent loading indicators


## Deployment


### Build Process
```bash
npm run build    # Production build
npm run dev      # Development server
npm run preview  # Preview production build
npm run lint     # Code linting
```


### Environment Variables
- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version


## Future Enhancements


### Planned Features
- **Real-time Collaboration**: Team project collaboration
- **Advanced Analytics**: Detailed performance metrics
- **Portfolio Templates**: More template options
- **Integration APIs**: GitHub, LinkedIn, Devpost integration
- **Mobile App**: React Native mobile application
- **AI Recommendations**: Smart project suggestions
- **Community Features**: Developer networking
- **Job Board Integration**: Direct job applications


### Technical Improvements
- **Backend API**: Node.js/Express or Python/FastAPI backend
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: AWS S3 for image uploads
- **Caching**: Redis for performance optimization
- **Testing**: Jest and React Testing Library
- **CI/CD**: GitHub Actions deployment pipeline
- **Monitoring**: Error tracking and performance monitoring


## Contributing


### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser to `http://localhost:5173`


### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit linting and formatting


### Testing Strategy
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API and routing testing
- **E2E Tests**: User workflow testing
- **Performance Tests**: Load and stress testing


---


*This document serves as the comprehensive guide for the HackFolio project structure and development guidelines.*


