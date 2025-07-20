# DevLabs Project Structure Diagram


## 📁 Root Directory Structure


```
devlabs/
├── 📁 .bolt/                    # Bolt Configuration
│   ├── 📄 config.json          # Template configuration
│   └── 📄 prompt               # Design guidelines
├── 📁 .cursor/                  # Cursor IDE Rules
│   └── 📁 rules/
│       └── 📄 byterover-rules.mdc
├── 📁 .github/                  # GitHub Configuration
│   └── 📄 copilot-instructions.md
├── 📁 public/                   # Static Assets
├── 📁 src/                      # Source Code
│   ├── 📁 components/           # Reusable Components
│   ├── 📁 contexts/             # React Contexts
│   ├── 📁 pages/                # Page Components
│   ├── 📁 services/             # API Services
│   ├── 📁 types/                # TypeScript Definitions
│   ├── 📁 lib/                  # Utility Functions
│   ├── 📄 App.tsx              # Main App Component
│   ├── 📄 main.tsx             # Entry Point
│   └── 📄 index.css            # Global Styles
├── 📄 .gitignore               # Git Ignore Rules
├── 📄 package.json             # Dependencies & Scripts
├── 📄 vite.config.ts           # Vite Configuration
├── 📄 tailwind.config.js       # Tailwind Configuration
├── 📄 tsconfig.json            # TypeScript Configuration
└── 📄 eslint.config.js         # ESLint Configuration
```


## 🧩 Component Architecture


```
src/components/
├── 📁 auth/                     # Authentication Components
│   └── 📄 ProtectedRoute.tsx   # Route Protection
├── 📁 layout/                   # Layout Components
│   ├── 📄 Header.tsx           # App Header
│   ├── 📄 Layout.tsx           # Main Layout
│   └── 📄 Sidebar.tsx          # Navigation Sidebar
└── 📁 ui/                       # Base UI Components
    ├── 📄 Button.tsx           # Button Component
    ├── 📄 Input.tsx            # Input Component
    └── 📄 LoadingSpinner.tsx   # Loading Indicator
```


## 📄 Page Structure


```
src/pages/
├── 📁 auth/                     # Authentication Pages
│   ├── 📄 Login.tsx            # Login Page
│   ├── 📄 Register.tsx         # Registration Page
│   ├── 📄 ForgotPassword.tsx   # Password Recovery
│   └── 📄 ResetPassword.tsx    # Password Reset
├── 📄 Landing.tsx              # Landing Page
├── 📄 Dashboard.tsx            # Main Dashboard
├── 📄 Projects.tsx             # Projects Management
├── 📄 Achievements.tsx         # Achievements Management
├── 📄 Portfolio.tsx            # Portfolio Customization
├── 📄 Analytics.tsx            # Analytics Dashboard
├── 📄 Profile.tsx              # User Profile
├── 📄 Settings.tsx             # User Settings
├── 📄 Search.tsx               # Search & Discovery
├── 📄 PublicPortfolio.tsx      # Public Portfolio View
└── 📄 NotFound.tsx             # 404 Page
```


## 🔄 Data Flow Architecture


```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Input    │───▶│  React State    │───▶│   UI Render     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Form Validation│    │ Context Update  │    │ Component Props │
│  (Yup Schema)   │    │ (AuthContext)   │    │ & Events        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Service   │───▶│  Backend API    │───▶│  Error Handling │
│   (Axios)       │    │  (Node.js)      │    │  & Loading      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```


## 🛣️ Routing Structure


```
/ (Landing Page)
├── /login                    # Authentication
├── /register                 # User Registration
├── /forgot-password          # Password Recovery
├── /reset-password           # Password Reset
├── /portfolio/:slug          # Public Portfolio
├── /search                   # Search & Discovery
└── /app (Protected Routes)
    ├── /dashboard            # Main Dashboard
    ├── /projects             # Projects Management
    ├── /achievements         # Achievements Management
    ├── /portfolio            # Portfolio Settings
    ├── /analytics            # Analytics Dashboard
    ├── /profile              # User Profile
    └── /settings             # User Settings
```


## 🎨 UI Component Hierarchy


```
App.tsx
├── AuthProvider
│   └── Router
│       ├── Landing Page
│       ├── Login Page
│       ├── Register Page
│       ├── Forgot Password
│       ├── Reset Password
│       ├── Public Portfolio
│       ├── Search Page
│       └── Protected Routes
│           └── Layout
│               ├── Header
│               ├── Sidebar
│               └── Page Content
│                   ├── Dashboard
│                   ├── Projects
│                   ├── Achievements
│                   ├── Portfolio
│                   ├── Analytics
│                   ├── Profile
│                   └── Settings
```


## 🔧 Service Layer Architecture


```
src/services/
├── api.ts                    # Main API client
│   ├── authAPI
│   │   ├── login()
│   │   ├── register()
│   │   ├── logout()
│   │   ├── refreshToken()
│   │   ├── forgotPassword()
│   │   ├── resetPassword()
│   │   └── verifyEmail()
│   ├── userAPI
│   │   ├── getProfile()
│   │   ├── updateProfile()
│   │   ├── uploadAvatar()
│   │   ├── updateSettings()
│   │   └── deleteAccount()
│   ├── projectsAPI
│   │   ├── getProjects()
│   │   ├── createProject()
│   │   ├── updateProject()
│   │   ├── deleteProject()
│   │   ├── uploadImages()
│   │   ├── toggleLike()
│   │   └── toggleFeatured()
│   ├── achievementsAPI
│   │   ├── getAchievements()
│   │   ├── createAchievement()
│   │   ├── updateAchievement()
│   │   ├── deleteAchievement()
│   │   └── verifyAchievement()
│   ├── portfolioAPI
│   │   ├── getPortfolioData()
│   │   ├── updateSettings()
│   │   ├── getPublicPortfolio()
│   │   ├── exportPDF()
│   │   ├── getTemplates()
│   │   └── generatePreview()
│   ├── analyticsAPI
│   │   ├── getDashboardStats()
│   │   ├── getPortfolioAnalytics()
│   │   ├── getProjectAnalytics()
│   │   ├── getSkillsAnalytics()
│   │   ├── trackView()
│   │   └── getInsights()
│   └── searchAPI
│       ├── searchProjects()
│       ├── searchUsers()
│       ├── searchTechnologies()
│       ├── getTrending()
│       └── getRecommendations()
├── auth.ts                   # Authentication utilities
├── storage.ts                # Local storage utilities
├── validation.ts             # Form validation schemas
└── utils.ts                  # General utilities
```


## 📊 State Management Flow


```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Local State    │    │  Context State  │    │  Form State     │
│  (useState)     │    │  (AuthContext)  │    │  (React Hook    │
└─────────────────┘    └─────────────────┘    │   Form)         │
         │                       │            └─────────────────┘
         ▼                       ▼                       │
┌─────────────────┐    ┌─────────────────┐              │
│ Component Props │    │ Global Auth     │              │
│ & Events        │    │ State           │              │
└─────────────────┘    └─────────────────┘              │
         │                       │                      │
         └───────────────────────┼──────────────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │   API Service Layer     │
                    │   (Node.js Backend)     │
                    └─────────────────────────┘
```


## 🎯 Feature Modules


### 🔐 Authentication Module
```
AuthContext.tsx
├── User State Management
├── Login/Register Functions
├── Token Management (JWT)
├── Password Recovery
├── Email Verification
└── Route Protection
```


### 📁 Project Management Module
```
Projects.tsx
├── Project CRUD Operations
├── Rich Metadata Management
├── Hackathon Details
├── Media Asset Upload
├── External Links
├── Team Management
├── Project Filtering & Search
├── Featured Projects
└── Project Analytics
```


### 🏆 Achievement Tracking Module
```
Achievements.tsx
├── Achievement CRUD
├── Achievement Types
├── Certificate Management
├── Verification System
├── Skill Association
├── Featured Achievements
├── Expiry Tracking
└── Achievement Analytics
```


### 🎨 Portfolio Generation Module
```
Portfolio.tsx
├── Template Selection (4 templates)
├── Customization Engine
├── Color Scheme Management
├── Section Visibility
├── Layout Preferences
├── Portfolio URL Management
├── Export Functionality (PDF)
└── Preview Generation
```


### 📈 Analytics Module
```
Analytics.tsx
├── Portfolio Performance Metrics
├── Technology Analysis
├── Project Analytics
├── Skills Progress Tracking
├── Growth Insights
├── Comparison Tools
├── AI-Powered Recommendations
└── Export Reports
```


### 🔍 Search & Discovery Module
```
Search.tsx
├── Project Search
├── User Search
├── Technology Search
├── Trending Projects
├── Personalized Recommendations
├── Advanced Filtering
└── Search Analytics
```


## 🔄 Development Workflow


```
1. Feature Development
   ├── Create/Update Components
   ├── Add/Modify Pages
   ├── Update Services
   ├── Update Types
   └── Test Functionality


2. State Management
   ├── Local State (useState)
   ├── Global State (Context)
   ├── Form State (React Hook Form)
   ├── API State (Services)
   └── Cache Management


3. Styling
   ├── Tailwind CSS Classes
   ├── Component Variants
   ├── Responsive Design
   ├── Design System
   └── Accessibility


4. Testing & Deployment
   ├── Unit Testing (Jest)
   ├── Integration Testing
   ├── E2E Testing
   ├── Performance Testing
   ├── Security Audit
   └── Deployment Pipeline
```


## 📱 Responsive Design Structure


```
Mobile First Approach
├── Base Styles (Mobile: < 768px)
├── Tablet Breakpoint (md: 768px - 1024px)
├── Desktop Breakpoint (lg: 1024px - 1280px)
└── Large Desktop (xl: > 1280px)


Component Responsiveness
├── Header (Mobile Menu)
├── Sidebar (Collapsible)
├── Grid Layouts (Responsive)
├── Typography (Scalable)
├── Forms (Mobile Optimized)
└── Portfolio Templates (Adaptive)
```


## 🔒 Security & Performance


### Security Features
```
├── JWT Authentication
├── Input Validation & Sanitization
├── Rate Limiting
├── CORS Configuration
├── File Upload Security
├── HTTPS Enforcement
└── Security Headers
```


### Performance Optimization
```
├── Code Splitting
├── Image Optimization
├── Bundle Optimization
├── Caching Strategies
├── CDN Integration
├── Database Indexing
└── Performance Monitoring
```


## 📊 Data Models (Updated)


### Enhanced User Model
```typescript
interface User {
  _id: ObjectId;
  email: string;
  password: string; // hashed
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
```


### Enhanced Project Model
```typescript
interface Project {
  _id: ObjectId;
  userId: ObjectId;
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
```


### Enhanced Achievement Model
```typescript
interface Achievement {
  _id: ObjectId;
  userId: ObjectId;
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
  projectId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```


### Analytics Model
```typescript
interface Analytics {
  _id: ObjectId;
  userId: ObjectId;
  portfolioViews: Array<{
    date: Date;
    views: number;
    uniqueVisitors: number;
    referrer?: string;
    location?: string;
  }>;
  projectViews: Array<{
    projectId: ObjectId;
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
```


---


*This updated diagram reflects the comprehensive DevLabs project structure based on the updated PRD, including all enhanced features, security measures, and performance optimizations.*
