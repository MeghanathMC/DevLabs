# 🚀 Deployment Checklist - DevLabs

## ✅ Frontend Status
**URL:** https://devlabs-delta.vercel.app/
**Status:** ✅ Deployed Successfully

## 🔧 Next Steps - Backend Deployment

### 1. Set up MongoDB Atlas
- [ ] Create MongoDB Atlas account at https://cloud.mongodb.com
- [ ] Create a new cluster (free tier)
- [ ] Create database user with read/write permissions
- [ ] Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/devlabs`)

### 2. Deploy Backend to Render
- [ ] Go to https://render.com
- [ ] Click "New" → "Web Service"
- [ ] Connect your GitHub repository
- [ ] Configure the service:
  - **Name:** `devlabs-backend`
  - **Root Directory:** `backend`
  - **Environment:** `Node`
  - **Build Command:** `npm install && npm run build`
  - **Start Command:** `npm start`

### 3. Set Environment Variables in Render
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

### 4. Get your Render Backend URL
After deployment, you'll get a URL like: `https://devlabs-backend.onrender.com`

### 5. Update Frontend Environment Variables in Vercel
- [ ] Go to your Vercel project dashboard
- [ ] Go to Settings → Environment Variables
- [ ] Add/Update:
  ```
  VITE_API_URL=https://devlabs-backend.onrender.com/api/v1
  VITE_GOOGLE_CLIENT_ID=your-google-client-id
  ```

### 6. Set up Google OAuth
- [ ] Go to https://console.cloud.google.com
- [ ] Create/select your project
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Add authorized redirect URIs:
  - `http://localhost:5000/api/v1/auth/google/callback` (development)
  - `https://devlabs-backend.onrender.com/api/v1/auth/google/callback` (production)

### 7. Test the Complete Application
- [ ] Test backend health: `curl https://devlabs-backend.onrender.com/health`
- [ ] Visit https://devlabs-delta.vercel.app/
- [ ] Test user registration/login
- [ ] Test all features (projects, achievements, portfolio)

## 🔗 Your URLs
- **Frontend:** https://devlabs-delta.vercel.app/
- **Backend:** https://devlabs-backend.onrender.com (after deployment)
- **API Endpoint:** https://devlabs-backend.onrender.com/api/v1

## 🛠️ Troubleshooting
If you encounter issues:
1. Check Render deployment logs
2. Verify all environment variables are set
3. Test backend health endpoint
4. Check CORS configuration
5. Verify MongoDB connection

## 📞 Support
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com 