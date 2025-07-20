# DevLabs - Backend Setup Guide

## 1. Project Structure

```
devlabs-backend/
├── src/
│   ├── controllers/           # Route controllers
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── projectController.ts
│   │   ├── achievementController.ts
│   │   ├── portfolioController.ts
│   │   └── analyticsController.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── upload.ts
│   │   ├── rateLimiter.ts
│   │   └── errorHandler.ts
│   ├── models/               # Mongoose models
│   │   ├── User.ts
│   │   ├── Project.ts
│   │   ├── Achievement.ts
│   │   └── Analytics.ts
│   ├── routes/               # API routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── projects.ts
│   │   ├── achievements.ts
│   │   ├── portfolio.ts
│   │   └── analytics.ts
│   ├── services/             # Business logic
│   │   ├── authService.ts
│   │   ├── emailService.ts
│   │   ├── uploadService.ts
│   │   ├── portfolioService.ts
│   │   └── analyticsService.ts
│   ├── utils/                # Utility functions
│   │   ├── database.ts
│   │   ├── jwt.ts
│   │   ├── encryption.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── config/               # Configuration
│   │   ├── database.ts
│   │   ├── cloudinary.ts
│   │   ├── email.ts
│   │   └── cors.ts
│   ├── types/                # TypeScript types
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── project.ts
│   │   └── api.ts
│   └── app.ts                # Express app setup
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── uploads/                  # Local file uploads (dev only)
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 2. Initial Setup

### 2.1 Initialize Project
```bash
# Create project directory
mkdir devlabs-backend
cd devlabs-backend

# Initialize npm project
npm init -y

# Install TypeScript and setup
npm install -g typescript
npm install -D typescript @types/node ts-node nodemon
npx tsc --init
```

### 2.2 Core Dependencies
```bash
# Core framework
npm install express
npm install -D @types/express

# Database
npm install mongoose
npm install -D @types/mongoose

# Authentication & Security
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken @types/bcryptjs

# Validation & Middleware
npm install joi cors helmet morgan compression
npm install -D @types/cors @types/morgan

# File Upload & Processing
npm install multer cloudinary
npm install -D @types/multer

# Email Service
npm install nodemailer
npm install -D @types/nodemailer

# Utilities
npm install dotenv uuid
npm install -D @types/uuid

# Development
npm install -D jest supertest @types/jest @types/supertest
```

### 2.3 Package.json Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 3. Configuration Files

### 3.1 TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 3.2 Environment Variables (.env.example)
```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/devlabs
MONGODB_TEST_URI=mongodb://localhost:27017/devlabs_test

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_FROM=noreply@devlabs.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Security
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

### 3.3 Jest Configuration (jest.config.js)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/types/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
```

## 4. Core Application Setup

### 4.1 Express App Setup (src/app.ts)
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import projectRoutes from './routes/projects';
import achievementRoutes from './routes/achievements';
import portfolioRoutes from './routes/portfolio';
import analyticsRoutes from './routes/analytics';

dotenv.config();

const app = express();

// Database connection
connectDatabase();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api', rateLimiter);

// API Routes
const API_VERSION = process.env.API_VERSION || 'v1';
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/projects`, projectRoutes);
app.use(`/api/${API_VERSION}/achievements`, achievementRoutes);
app.use(`/api/${API_VERSION}/portfolio`, portfolioRoutes);
app.use(`/api/${API_VERSION}/analytics`, analyticsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
```

### 4.2 Database Configuration (src/config/database.ts)
```typescript
import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.NODE_ENV === 'test' 
      ? process.env.MONGODB_TEST_URI 
      : process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined');
    }

    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};

// Handle connection events
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});
```

## 5. Authentication System

### 5.1 User Model (src/models/User.ts)
```typescript
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
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
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: String,
    bio: String,
    location: String,
    university: String,
    graduationYear: Number,
    skills: [{ type: String, trim: true }],
    socialLinks: {
      github: String,
      linkedin: String,
      portfolio: String,
      twitter: String
    }
  },
  settings: {
    portfolioSlug: { type: String, unique: true, sparse: true },
    isPublic: { type: Boolean, default: false },
    theme: { 
      type: String, 
      enum: ['modern', 'professional', 'creative', 'minimal'],
      default: 'modern'
    },
    customization: {
      primaryColor: { type: String, default: '#2563eb' },
      secondaryColor: { type: String, default: '#64748b' },
      font: { type: String, default: 'Inter' },
      showSection: {
        about: { type: Boolean, default: true },
        projects: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
        skills: { type: Boolean, default: true },
        contact: { type: Boolean, default: true }
      }
    }
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    publicProfile: { type: Boolean, default: false },
    showEmail: { type: Boolean, default: false }
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ 'settings.portfolioSlug': 1 });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
```

### 5.2 JWT Utilities (src/utils/jwt.ts)
```typescript
import jwt from 'jsonwebtoken';

export interface JWTPayload {
  userId: string;
  email: string;
}

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  });
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JWTPayload;
};
```

### 5.3 Authentication Middleware (src/middleware/auth.ts)
```typescript
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId).select('-password');
      req.user = user || undefined;
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
```

### 5.4 Authentication Controller (src/controllers/authController.ts)
```typescript
import { Request, Response } from 'express';
import User from '../models/User';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { validateRegister, validateLogin } from '../utils/validation';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password, firstName, lastName } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Generate unique portfolio slug
    const baseSlug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    let portfolioSlug = baseSlug;
    let counter = 1;
    
    while (await User.findOne({ 'settings.portfolioSlug': portfolioSlug })) {
      portfolioSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create user
    const user = new User({
      email,
      password,
      profile: { firstName, lastName },
      settings: { portfolioSlug }
    });

    await user.save();

    const payload = { userId: user._id.toString(), email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        settings: user.settings
      },
      tokens: { accessToken, refreshToken }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = validateLogin(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password } = value;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const payload = { userId: user._id.toString(), email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        settings: user.settings
      },
      tokens: { accessToken, refreshToken }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

## 6. Project Management System

### 6.1 Project Model (src/models/Project.ts)
```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
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

const ProjectSchema = new Schema<IProject>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true },
  technologies: [{ type: String, trim: true }],
  category: {
    type: String,
    enum: ['web', 'mobile', 'ai', 'blockchain', 'iot', 'game', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'abandoned'],
    default: 'completed'
  },
  images: [String],
  videos: [String],
  links: {
    github: String,
    demo: String,
    devpost: String,
    youtube: String,
    slides: String
  },
  hackathon: {
    name: String,
    date: Date,
    location: String,
    duration: String,
    organizer: String,
    website: String
  },
  team: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    github: String,
    linkedin: String
  }],
  achievements: [String],
  tags: [String],
  featured: { type: Boolean, default: false },
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    githubStars: Number
  }
}, {
  timestamps: true
});

// Indexes
ProjectSchema.index({ userId: 1 });
ProjectSchema.index({ technologies: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ 'hackathon.date': -1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
```

### 6.2 Project Controller (src/controllers/projectController.ts)
```typescript
import { Response } from 'express';
import Project from '../models/Project';
import { AuthRequest } from '../middleware/auth';
import { validateProject } from '../utils/validation';

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, category, status, search, featured } = req.query;
    const filter: any = { userId: req.user!._id };

    // Apply filters
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured) filter.featured = featured === 'true';
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(Number(limit) * Number(page))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Project.countDocuments(filter);

    res.json({
      projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error, value } = validateProject(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const project = new Project({
      ...value,
      userId: req.user!._id
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error, value } = validateProject(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, userId: req.user!._id },
      value,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findOneAndDelete({
      _id: id,
      userId: req.user!._id
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

## 7. File Upload System

### 7.1 Cloudinary Configuration (src/config/cloudinary.ts)
```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
```

### 7.2 Upload Middleware (src/middleware/upload.ts)
```typescript
import multer from 'multer';
import { Request } from 'express';

// Memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') // 5MB
  }
});
```

### 7.3 Upload Service (src/services/uploadService.ts)
```typescript
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  bytes: number;
}

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        transformation: resourceType === 'image' ? [
          { width: 1200, height: 800, crop: 'limit', quality: 'auto:good' }
        ] : undefined
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            bytes: result.bytes
          });
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};
```

## 8. Validation Schemas

### 8.1 Validation Utils (src/utils/validation.ts)
```typescript
import Joi from 'joi';

export const validateRegister = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required()
  });

  return schema.validate(data);
};

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

export const validateProject = (data: any) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    shortDescription: Joi.string().max(200).required(),
    description: Joi.string().min(10).required(),
    technologies: Joi.array().items(Joi.string()).min(1).required(),
    category: Joi.string().valid('web', 'mobile', 'ai', 'blockchain', 'iot', 'game', 'other').required(),
    status: Joi.string().valid('completed', 'ongoing', 'abandoned').default('completed'),
    images: Joi.array().items(Joi.string().uri()),
    videos: Joi.array().items(Joi.string().uri()),
    links: Joi.object({
      github: Joi.string().uri(),
      demo: Joi.string().uri(),
      devpost: Joi.string().uri(),
      youtube: Joi.string().uri(),
      slides: Joi.string().uri()
    }),
    hackathon: Joi.object({
      name: Joi.string().required(),
      date: Joi.date().required(),
      location: Joi.string().required(),
      duration: Joi.string(),
      organizer: Joi.string(),
      website: Joi.string().uri()
    }),
    team: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      role: Joi.string().required(),
      github: Joi.string().uri(),
      linkedin: Joi.string().uri()
    })),
    achievements: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    featured: Joi.boolean().default(false)
  });

  return schema.validate(data);
};
```

## 9. Error Handling & Middleware

### 9.1 Error Handler (src/middleware/errorHandler.ts)
```typescript
import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  }

  // Mongoose duplicate key error
  if (error.name === 'MongoError' && (error as any).code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
  }

  // JWT error
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method
  });

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};
```

### 9.2 Rate Limiter (src/middleware/rateLimiter.ts)
```typescript
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
  skipSuccessfulRequests: true
});
```

## 10. Development Commands

### 10.1 Start Development Server
```bash
npm run dev
```

### 10.2 Build for Production
```bash
npm run build
npm start
```

### 10.3 Run Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

### 10.4 Database Operations
```bash
# Seed database (create seed script)
npm run seed

# Reset database
npm run db:reset
```

This backend setup provides a solid foundation for your DevLabs application with proper authentication, project management, file upload, and error handling systems in place.