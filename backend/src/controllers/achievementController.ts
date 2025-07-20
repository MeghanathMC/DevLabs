import { Response } from 'express';
import Achievement from '../models/Achievement';
import { AuthRequest } from '../middleware/auth';
import { validateAchievement } from '../utils/validation';

export const getAchievements = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, type, category, featured } = req.query;
    const filter: any = { userId: req.user!._id };

    // Apply filters
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';

    const achievements = await Achievement.find(filter)
      .sort({ featured: -1, date: -1 })
      .limit(Number(limit) * Number(page))
      .skip((Number(page) - 1) * Number(limit))
      .populate('projectId', 'title');

    const total = await Achievement.countDocuments(filter);

    res.json({
      achievements,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAchievement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error, value } = validateAchievement(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
      return;
    }

    const achievement = new Achievement({
      ...value,
      userId: req.user!._id
    });

    await achievement.save();

    res.status(201).json({
      message: 'Achievement created successfully',
      achievement
    });
  } catch (error) {
    console.error('Create achievement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAchievement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findOne({ _id: id, userId: req.user!._id })
      .populate('projectId', 'title');

    if (!achievement) {
      res.status(404).json({ error: 'Achievement not found' });
      return;
    }

    res.json({ achievement });
  } catch (error) {
    console.error('Get achievement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAchievement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error, value } = validateAchievement(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
      return;
    }

    const achievement = await Achievement.findOneAndUpdate(
      { _id: id, userId: req.user!._id },
      value,
      { new: true, runValidators: true }
    ).populate('projectId', 'title');

    if (!achievement) {
      res.status(404).json({ error: 'Achievement not found' });
      return;
    }

    res.json({
      message: 'Achievement updated successfully',
      achievement
    });
  } catch (error) {
    console.error('Update achievement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAchievement = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findOneAndDelete({
      _id: id,
      userId: req.user!._id
    });

    if (!achievement) {
      res.status(404).json({ error: 'Achievement not found' });
      return;
    }

    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Delete achievement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};