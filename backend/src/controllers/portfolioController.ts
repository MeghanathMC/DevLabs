import { Response } from 'express';
import User from '../models/User';
import Project from '../models/Project';
import Achievement from '../models/Achievement';
import { AuthRequest } from '../middleware/auth';
import { validatePortfolioSettings } from '../utils/validation';

export const getPortfolioData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!._id).select('-password');
    const projects = await Project.find({ userId: req.user!._id, featured: true }).sort({ createdAt: -1 });
    const achievements = await Achievement.find({ userId: req.user!._id, featured: true }).sort({ date: -1 });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      user,
      projects,
      achievements
    });
  } catch (error) {
    console.error('Get portfolio data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePortfolioSettings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error, value } = validatePortfolioSettings(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { settings: value },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      message: 'Portfolio settings updated successfully',
      settings: user.settings
    });
  } catch (error) {
    console.error('Update portfolio settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPublicPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    
    const user = await User.findOne({ 'settings.portfolioSlug': slug, 'settings.isPublic': true })
      .select('-password -email');

    if (!user) {
      res.status(404).json({ error: 'Portfolio not found or not public' });
      return;
    }

    const projects = await Project.find({ 
      userId: user._id, 
      featured: true 
    }).sort({ createdAt: -1 });

    const achievements = await Achievement.find({ 
      userId: user._id, 
      featured: true 
    }).sort({ date: -1 });

    // Track view (optional authentication)
    if (req.user && req.user._id.toString() !== user._id.toString()) {
      // TODO: Implement view tracking
    }

    res.json({
      user,
      projects,
      achievements
    });
  } catch (error) {
    console.error('Get public portfolio error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const exportPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!._id).select('-password');
    const projects = await Project.find({ userId: req.user!._id, featured: true }).sort({ createdAt: -1 });
    const achievements = await Achievement.find({ userId: req.user!._id, featured: true }).sort({ date: -1 });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // TODO: Implement PDF generation
    // For now, return the data that would be used for PDF generation
    const portfolioData = {
      user,
      projects,
      achievements,
      exportDate: new Date().toISOString()
    };

    res.json({
      message: 'Portfolio export data prepared',
      data: portfolioData
    });
  } catch (error) {
    console.error('Export portfolio error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTemplates = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const templates = [
      {
        id: 'modern',
        name: 'Modern',
        description: 'Contemporary, clean design with modern typography',
        preview: '/templates/modern-preview.png',
        features: ['Clean layout', 'Modern typography', 'Card-based design']
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'Business-focused layout for corporate environments',
        preview: '/templates/professional-preview.png',
        features: ['Professional appearance', 'Structured layout', 'Corporate friendly']
      },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Bold, innovative presentation with unique styling',
        preview: '/templates/creative-preview.png',
        features: ['Bold design', 'Creative elements', 'Unique styling']
      },
      {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean, typography-focused minimal design',
        preview: '/templates/minimal-preview.png',
        features: ['Minimal design', 'Typography focus', 'Clean layout']
      }
    ];

    res.json({ templates });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const generatePreview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { settings } = req.body;
    
    const { error, value } = validatePortfolioSettings(settings);
    if (error) {
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
      return;
    }

    const user = await User.findById(req.user!._id).select('-password');
    const projects = await Project.find({ userId: req.user!._id, featured: true }).sort({ createdAt: -1 });
    const achievements = await Achievement.find({ userId: req.user!._id, featured: true }).sort({ date: -1 });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Create preview data with temporary settings
    const previewData = {
      user: {
        ...user.toObject(),
        settings: value
      },
      projects,
      achievements,
      isPreview: true
    };

    res.json({
      message: 'Portfolio preview generated',
      preview: previewData
    });
  } catch (error) {
    console.error('Generate preview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 