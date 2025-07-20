import { Request, Response } from 'express';
import User from '../models/User';
import Project from '../models/Project';
import Achievement from '../models/Achievement';
import { AuthRequest } from '../middleware/auth';

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Get counts from database
    const [totalProjects, completedProjects, ongoingProjects, totalAchievements] = await Promise.all([
      Project.countDocuments({ userId }),
      Project.countDocuments({ userId, status: 'completed' }),
      Project.countDocuments({ userId, status: 'ongoing' }),
      Achievement.countDocuments({ userId })
    ]);

    // Mock data for now (these would come from actual analytics tracking)
    const portfolioViews = Math.floor(Math.random() * 1000) + 500;
    const githubStars = Math.floor(Math.random() * 200) + 50;
    const hackathonsAttended = Math.floor(Math.random() * 10) + 3;
    const awardsWon = Math.floor(Math.random() * 5) + 1;

    // Mock monthly views data
    const monthlyViews = [
      { month: 'Jan', views: Math.floor(Math.random() * 200) + 50 },
      { month: 'Feb', views: Math.floor(Math.random() * 200) + 100 },
      { month: 'Mar', views: Math.floor(Math.random() * 200) + 150 },
      { month: 'Apr', views: Math.floor(Math.random() * 200) + 200 },
      { month: 'May', views: Math.floor(Math.random() * 200) + 250 },
      { month: 'Jun', views: Math.floor(Math.random() * 200) + 300 }
    ];

    // Get top technologies from projects
    const projects = await Project.find({ userId }).select('technologies');
    const technologyCount: { [key: string]: number } = {};
    
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        technologyCount[tech] = (technologyCount[tech] || 0) + 1;
      });
    });

    const topTechnologies = Object.entries(technologyCount)
      .map(([name, count]) => ({ name, count, percentage: Math.round((count / totalProjects) * 100) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const stats = {
      totalProjects,
      completedProjects,
      ongoingProjects,
      totalAchievements,
      portfolioViews,
      githubStars,
      hackathonsAttended,
      awardsWon,
      monthlyViews,
      topTechnologies
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard statistics' });
  }
};