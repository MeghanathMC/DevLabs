import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

// Only initialize Google Strategy if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/google/callback',
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ email: profile.emails?.[0]?.value });

          if (user) {
            // Update last login
            user.lastLogin = new Date();
            await user.save();
            return done(null, user);
          }

          // Create new user
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error('Email not provided by Google'), undefined);
          }

          const firstName = profile.name?.givenName || 'User';
          const lastName = profile.name?.familyName || 'Name';

          // Generate unique portfolio slug
          const baseSlug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
          let portfolioSlug = baseSlug;
          let counter = 1;
          
          while (await User.findOne({ 'settings.portfolioSlug': portfolioSlug })) {
            portfolioSlug = `${baseSlug}-${counter}`;
            counter++;
          }

          user = new User({
            email,
            password: 'google-oauth-' + Math.random().toString(36).substring(2), // Random password for OAuth users
            profile: {
              firstName,
              lastName,
              avatar: profile.photos?.[0]?.value,
              skills: []
            },
            settings: {
              portfolioSlug,
              isPublic: false,
              theme: 'modern',
              customization: {
                primaryColor: '#2563eb',
                secondaryColor: '#64748b',
                font: 'Inter',
                showSection: {
                  about: true,
                  projects: true,
                  achievements: true,
                  skills: true,
                  contact: true
                }
              }
            },
            preferences: {
              emailNotifications: true,
              publicProfile: false,
              showEmail: false
            }
          });

          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error, undefined);
        }
      }
    )
  );
} else {
  console.warn('Google OAuth credentials not found. Google OAuth will be disabled.');
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport; 