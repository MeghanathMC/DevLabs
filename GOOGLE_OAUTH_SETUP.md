# Google OAuth Setup Guide

To enable Google OAuth authentication in DevLabs, follow these steps:

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

## 2. Create OAuth 2.0 Credentials9

1. In the Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add the following authorized redirect URIs:
   - `http://localhost:5000/api/v1/auth/google/callback` (for development)
   - `https://yourdomain.com/api/v1/auth/google/callback` (for production)
5. Click "Create"
6. Note down your Client ID and Client Secret

## 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Session Configuration
SESSION_SECRET=your-session-secret-key-here
```

## 4. Start the Backend Server

```bash
cd backend
npm run dev
```

## 5. Test Google OAuth

1. Start the frontend application
2. Go to the login or register page
3. Click "Sign in with Google" or "Sign up with Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you'll be redirected back to the application

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**: Make sure the redirect URI in Google Cloud Console exactly matches your `GOOGLE_CALLBACK_URL`

2. **"Client ID not found" error**: Verify your `GOOGLE_CLIENT_ID` is correct

3. **"Invalid client secret" error**: Verify your `GOOGLE_CLIENT_SECRET` is correct

4. **CORS errors**: Make sure your frontend URL is properly configured in the backend CORS settings

### Development vs Production:

- **Development**: Use `http://localhost:5000/api/v1/auth/google/callback`
- **Production**: Use `https://yourdomain.com/api/v1/auth/google/callback`

Make sure to update both the Google Cloud Console and your environment variables accordingly.

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique session secrets
- In production, use HTTPS for all OAuth callbacks
- Regularly rotate your OAuth credentials 