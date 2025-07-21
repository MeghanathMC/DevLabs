#!/bin/bash

echo "🚀 DevLabs Deployment Script"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Prerequisites Check:"
echo "1. Make sure you have:"
echo "   - MongoDB Atlas account and connection string"
echo "   - Render account"
echo "   - Vercel account"
echo "   - Google OAuth credentials"
echo "   - Cloudinary account (optional)"
echo ""

echo "🔧 Backend Setup:"
echo "1. Copy backend/env.example to backend/.env"
echo "2. Fill in your environment variables in backend/.env"
echo "3. Deploy backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Set root directory to 'backend'"
echo "   - Set build command: 'npm install && npm run build'"
echo "   - Set start command: 'npm start'"
echo "   - Add all environment variables from backend/env.example"
echo ""


echo "🌐 Frontend Setup:"
echo "1. Copy env.example to .env"
echo "2. Update VITE_API_URL with your Render backend URL"
echo "3. Deploy frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Create new project"
echo "   - Import your GitHub repo"
echo "   - Set framework to Vite"
echo "   - Add environment variables"
echo ""

echo "✅ After deployment:"
echo "1. Test backend health: curl https://your-backend.onrender.com/health"
echo "2. Test frontend: Visit your Vercel URL"
echo "3. Test authentication and all features"
echo ""

echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""

read -p "Press Enter to continue..." 