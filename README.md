# DevLabs - Developer Portfolio Platform

<div align="center">

![DevLabs Logo](https://img.shields.io/badge/DevLabs-Portfolio%20Platform-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A comprehensive portfolio aggregation platform designed to help developers showcase their hackathon projects, achievements, and technical skills through professional, customizable portfolios.

[Live Demo](https://devlabs-demo.vercel.app) • [Documentation](https://devlabs-docs.vercel.app) • [Issues](https://github.com/your-username/devlabs/issues)

</div>

## 🚀 Features

### ✨ Core Features
- **🔐 Authentication & User Management**: Secure JWT-based authentication with comprehensive user profiles
- **📁 Project Management**: Rich project repository with hackathon details, team information, and media assets
- **🏆 Achievement Tracking**: Comprehensive tracking of awards, certificates, and recognitions
- **🎨 Dynamic Portfolio Generation**: Multiple professional templates with customization options
- **📊 Analytics Dashboard**: Portfolio performance tracking and insights
- **🌐 Public Portfolio Pages**: SEO-optimized, shareable portfolio URLs

### 🛠️ Technical Features
- **📱 Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **🎨 Modern UI**: TAP Academy design system with Tailwind CSS
- **✨ Smooth Animations**: Framer Motion for micro-interactions
- **🔒 Type Safety**: Full TypeScript implementation
- **⚡ Performance Optimized**: Code splitting and optimized bundle size

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router DOM v7** for routing
- **React Hook Form + Yup** for form handling
- **Framer Motion** for animations
- **Recharts** for analytics visualization
- **Heroicons & Lucide React** for icons

### Backend
- **Node.js + Express** with TypeScript
- **MongoDB + Mongoose** for database
- **JWT + bcrypt** for authentication
- **Cloudinary** for file storage
- **Nodemailer** for email services
- **Passport.js** for OAuth (Google)

## 📁 Project Structure

```
project/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── auth/                # Authentication components
│   │   ├── layout/              # Layout components
│   │   └── ui/                  # Reusable UI components
│   ├── contexts/                # React contexts
│   ├── pages/                   # Page components
│   ├── services/                # API services
│   ├── types/                   # TypeScript types
│   └── lib/                     # Utility functions
├── backend/                     # Backend source code
│   ├── src/
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/          # Express middleware
│   │   ├── models/              # Mongoose models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── config/              # Configuration
│   │   └── types/               # TypeScript types
│   └── tests/                   # Test files
├── public/                      # Static assets
└── docs/                        # Documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **MongoDB** (local or cloud)
- **Cloudinary** account (for file uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/devlabs.git
cd devlabs
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173)

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 4. Environment Configuration
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/devlabs

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Optional)
EMAIL_FROM=noreply@devlabs.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 5. Start Backend Server
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The backend API will be available at [http://localhost:5000](http://localhost:5000)

### 6. Database Setup
```bash
# Start MongoDB (if using local instance)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

### 7. Create Demo User (Optional)
```bash
cd backend
npm run create-demo
```

This creates a demo account for testing:
- **Email:** demo@example.com
- **Password:** password
- **Portfolio URL:** /portfolio/demo-user

## 📚 API Documentation

### Authentication Endpoints
```typescript
POST /api/v1/auth/register     # Register new user
POST /api/v1/auth/login        # User login
GET  /api/v1/auth/verify       # Verify JWT token
POST /api/v1/auth/logout       # User logout
```

### Project Endpoints
```typescript
GET    /api/v1/projects        # Get all projects
POST   /api/v1/projects        # Create new project
GET    /api/v1/projects/:id    # Get project by ID
PUT    /api/v1/projects/:id    # Update project
DELETE /api/v1/projects/:id    # Delete project
```

### Achievement Endpoints
```typescript
GET    /api/v1/achievements    # Get all achievements
POST   /api/v1/achievements    # Create new achievement
GET    /api/v1/achievements/:id # Get achievement by ID
PUT    /api/v1/achievements/:id # Update achievement
DELETE /api/v1/achievements/:id # Delete achievement
```

### Portfolio Endpoints
```typescript
GET  /api/v1/portfolio/:slug   # Get public portfolio
PUT  /api/v1/portfolio/settings # Update portfolio settings
```

## 🎨 Design System

### Colors (TAP Academy)
```css
/* Primary Colors */
--primary: #269BDA;
--primary-light: #3FAEE6;
--primary-dark: #1E7AB8;

/* Background Colors */
--bg-primary: #1c2026;
--bg-secondary: #242830;
--bg-tertiary: #2D3139;

/* Text Colors */
--text-primary: #f5f5f5;
--text-secondary: rgba(245, 245, 245, 0.80);
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 400, 500, 600, 700
- **Line Heights**: 150% (body), 120% (headings)

### Component Variants
```typescript
// Button variants
const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-primary hover:bg-tertiary",
  outline: "border border-primary text-primary hover:bg-primary"
};

// Card variants
const cardVariants = {
  default: "bg-secondary rounded-lg p-6",
  elevated: "bg-secondary rounded-lg p-6 shadow-lg",
  interactive: "bg-secondary rounded-lg p-6 hover:shadow-xl transition-shadow"
};
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Client and server-side validation with Yup/Joi
- **Protected Routes**: Route-level authentication guards
- **CORS**: Proper cross-origin resource sharing
- **Rate Limiting**: API rate limiting (100 requests per 15 minutes)
- **Helmet**: Security headers middleware
- **bcrypt**: Password hashing with salt rounds

## 📊 Data Models

### User Model
```typescript
interface User {
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
}
```

### Project Model
```typescript
interface Project {
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
```

### Achievement Model
```typescript
interface Achievement {
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
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🧪 Testing

### Frontend Testing
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
cd backend

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repository for automatic deployments
```

### Backend Deployment (Railway/Heroku)
```bash
# Set environment variables in deployment platform
# Build and deploy
npm run build
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=https://your-frontend-domain.com
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TAP Academy](https://tapacademy.com) for design inspiration
- [React](https://reactjs.org) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

- **Email**: support@devlabs.com
- **Discord**: [DevLabs Community](https://discord.gg/devlabs)
- **Documentation**: [https://devlabs-docs.vercel.app](https://devlabs-docs.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/your-username/devlabs/issues)

---

<div align="center">

Made with ❤️ by the DevLabs Team

[![GitHub stars](https://img.shields.io/github/stars/your-username/devlabs?style=social)](https://github.com/your-username/devlabs)
[![GitHub forks](https://img.shields.io/github/forks/your-username/devlabs?style=social)](https://github.com/your-username/devlabs)
[![GitHub issues](https://img.shields.io/github/issues/your-username/devlabs)](https://github.com/your-username/devlabs/issues)

</div>