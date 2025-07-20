import { Request, Response } from 'express';
import User from '../models/User';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { validateRegister, validateLogin } from '../utils/validation';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
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
      profile: { firstName, lastName, skills: [] },
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

    const payload = { userId: (user._id as any).toString(), email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        avatar: user.profile.avatar,
        bio: user.profile.bio,
        location: user.profile.location,
        university: user.profile.university,
        graduationYear: user.profile.graduationYear,
        skills: user.profile.skills,
        socialLinks: user.profile.socialLinks,
        portfolioSlug: user.settings.portfolioSlug,
        settings: user.settings,
        preferences: user.preferences
      },
      token: accessToken
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
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
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

    const payload = { userId: (user._id as any).toString(), email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        avatar: user.profile.avatar,
        bio: user.profile.bio,
        location: user.profile.location,
        university: user.profile.university,
        graduationYear: user.profile.graduationYear,
        skills: user.profile.skills,
        socialLinks: user.profile.socialLinks,
        portfolioSlug: user.settings.portfolioSlug,
        settings: user.settings,
        preferences: user.preferences
      },
      token: accessToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const verify = async (req: any, res: Response): Promise<void> => {
  try {
    // If we reach here, the authentication middleware has already verified the token
    const user = req.user;
    res.json({ 
      valid: true, 
      user: {
        id: user._id,
        email: user.email,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        avatar: user.profile.avatar,
        bio: user.profile.bio,
        location: user.profile.location,
        university: user.profile.university,
        graduationYear: user.profile.graduationYear,
        skills: user.profile.skills,
        socialLinks: user.profile.socialLinks,
        portfolioSlug: user.settings.portfolioSlug,
        settings: user.settings,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};