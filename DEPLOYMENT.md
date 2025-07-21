# Deployment Guide

This guide will help you deploy the DevLabs application with the backend on Render and frontend on Vercel.

## Prerequisites

1. **MongoDB Atlas Account** - For the database
2. **Render Account** - For backend hosting
3. **Vercel Account** - For frontend hosting
4. **Cloudinary Account** - For image uploads (optional)
5. **Google OAuth Credentials** - For authentication

## Backend Deployment (Render)

### 1. Set up MongoDB Atlas

1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster (free tier is sufficient)
3. Create a database user with read/write permissions
4. Get your connection string

### 2. Deploy to Render

1. **Fork/Clone the repository**
2. **Connect to Render:**
   - Go to https://render.com
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure the service:**
   - **Name:** `devlabs-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devlabs
   JWT_SECRET=your-super-secret-jwt-key
   SESSION_SECRET=your-session-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
       FRONTEND_URL=https://devlabs-delta.vercel.app
   ```

5. **Deploy:** Click "Create Web Service"

### 3. Get your Render URL

After deployment, you'll get a URL like: `https://devlabs-backend.onrender.com`

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure the project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (root of the project)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Set Environment Variables:**
   ```
   VITE_API_URL=https://devlabs-backend.onrender.com/api/v1
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Deploy:** Click "Deploy"

### 2. Get your Vercel URL

After deployment, you'll get a URL like: `https://devlabs-delta.vercel.app`

## Environment Variables Setup

### Backend (.env file for local development)

Copy `backend/env.example` to `backend/.env` and fill in your values:

```bash
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/devlabs

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=your-session-secret-key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env file for local development)

Copy `env.example` to `.env` and fill in your values:

```bash
# Backend API URL
VITE_API_URL=http://localhost:5000/api/v1

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# App Configuration
VITE_APP_NAME=DevLabs
VITE_APP_VERSION=1.0.0
```

## Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/api/v1/auth/google/callback` (development)
   - `https://devlabs-backend.onrender.com/api/v1/auth/google/callback` (production)
6. Copy Client ID and Client Secret

## Cloudinary Setup (Optional)

1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your environment variables

## Testing the Deployment

1. **Test Backend:**
   ```bash
   curl https://devlabs-backend.onrender.com/health
   ```

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try to register/login
   - Test all features

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Make sure FRONTEND_URL is set correctly in backend
   - Check that the frontend URL is in the allowed origins

2. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check network access settings in Atlas

3. **Build Failures:**
   - Check build logs in Render/Vercel
   - Ensure all dependencies are in package.json

4. **Environment Variables:**
   - Double-check all environment variables are set
   - Restart the service after changing environment variables

### Support

- **Render Documentation:** https://render.com/docs
- **Vercel Documentation:** https://vercel.com/docs
- **MongoDB Atlas Documentation:** https://docs.atlas.mongodb.com

## Security Notes

1. **Never commit .env files** to version control
2. **Use strong secrets** for JWT_SECRET and SESSION_SECRET
3. **Enable HTTPS** (handled automatically by Render and Vercel)
4. **Set up proper CORS** configuration
5. **Use environment variables** for all sensitive data 