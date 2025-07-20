# DevLabs - Developer Portfolio Platform

A comprehensive portfolio aggregation platform designed to help developers showcase their hackathon projects, achievements, and technical skills through professional, customizable portfolios.

## 🚀 Features

### Core Features
- **Authentication & User Management**: Secure JWT-based authentication with comprehensive user profiles
- **Project Management**: Rich project repository with hackathon details, team information, and media assets
- **Achievement Tracking**: Comprehensive tracking of awards, certificates, and recognitions
- **Dynamic Portfolio Generation**: Multiple professional templates with customization options
- **Analytics Dashboard**: Portfolio performance tracking and insights
- **Public Portfolio Pages**: SEO-optimized, shareable portfolio URLs

### Technical Features
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Modern UI**: TAP Academy design system with Tailwind CSS
- **Smooth Animations**: Framer Motion for micro-interactions
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Code splitting and optimized bundle size

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

### Backend (Recommended)
- **Node.js + Express** with TypeScript
- **MongoDB + Mongoose** for database
- **JWT + bcrypt** for authentication
- **Cloudinary/AWS S3** for file storage

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   └── ui/             # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── pages/              # Page components
├── services/           # API services and utilities
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── styles/             # Global styles and Tailwind config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/devlabs.git
cd devlabs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Demo Credentials
- **Email**: demo@example.com
- **Password**: password

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
}
```

## 🎨 Design System

### Colors (TAP Academy)
- **Primary**: #269BDA (Blue)
- **Primary Variants**: #3FAEE6, #1E7AB8, #165F91
- **Background**: #1c2026 (Primary), #242830 (Secondary), #2D3139 (Tertiary)
- **Text**: #f5f5f5 (Primary), rgba(245, 245, 245, 0.80) (Secondary)

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Display, H1-H4, Body (Large, Regular, Small), Caption
- **Line Heights**: 150% for body text, 120% for headings

### Components
- **Buttons**: Primary, Secondary, Tertiary variants
- **Cards**: Interactive cards with hover effects
- **Inputs**: Consistent form styling with focus states
- **Navigation**: Floating nav and sidebar layouts

## 📱 Responsive Design

- **Mobile First**: Touch-optimized mobile experience
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Targets**: Minimum 44px for accessibility

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Client and server-side validation
- **Protected Routes**: Route-level authentication guards
- **CORS**: Proper cross-origin resource sharing
- **Rate Limiting**: API rate limiting (backend)

## 📈 Performance

- **Code Splitting**: Route-based code splitting
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP format and compression
- **Caching**: Browser caching strategies
- **Lighthouse Score**: Target > 90 for all metrics

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Vite + TypeScript
- [x] Authentication system
- [x] Basic UI component library
- [x] User management

### Phase 2: Core Features ✅
- [x] Project management system
- [x] Achievement tracking
- [x] Basic dashboard
- [x] Portfolio templates

### Phase 3: Advanced Features 🚧
- [ ] Enhanced analytics dashboard
- [ ] Advanced search and filtering
- [ ] Portfolio customization engine
- [ ] Export functionality (PDF)

### Phase 4: Future Enhancements 📋
- [ ] GitHub integration
- [ ] LinkedIn sync
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Community features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TAP Academy** for the design system and color palette
- **Heroicons & Lucide** for the beautiful icon sets
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **React Community** for the amazing ecosystem

## 📞 Support

For support, email support@devlabs.com or join our Discord community.

---

**DevLabs** - Showcase Your Developer Journey 🚀