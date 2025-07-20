import express from 'express';
import passport from 'passport';
import { register, login, verify } from '../controllers/authController';
import { authenticate, AuthRequest } from '../middleware/auth';
import { generateAccessToken } from '../utils/jwt';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authenticate, (req, res) => verify(req as AuthRequest, res));

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      // Successful authentication, generate JWT token
      const user = req.user as any;
      const payload = { userId: user._id.toString(), email: user.email };
      const accessToken = generateAccessToken(payload);
      
      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth/callback?token=${accessToken}`);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed`);
    }
  }
);

export default router;