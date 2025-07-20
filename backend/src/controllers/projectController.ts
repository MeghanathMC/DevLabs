import { Response } from 'express';
import Project from '../models/Project';
import { AuthRequest } from '../middleware/auth';
import { validateProject } from '../utils/validation';

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, category, status, search, featured } = req.query;
    const filter: any = { userId: req.user!._id };

    // Apply filters
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured) filter.featured = featured === 'true';
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(Number(limit) * Number(page))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Project.countDocuments(filter);

    res.json({
      projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { error, value } = validateProject(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
      return;
    }

    // Clean up the data before saving
    const projectData = {
      ...value,
      userId: req.user!._id
    };

    // Handle empty hackathon data
    if (projectData.hackathon) {
      const hackathon = projectData.hackathon;
      // Remove hackathon object if all fields are empty
      if (!hackathon.name && !hackathon.date && !hackathon.location && !hackathon.organizer) {
        delete projectData.hackathon;
      } else {
        // Convert empty strings to undefined for optional fields
        if (!hackathon.name) delete hackathon.name;
        if (!hackathon.date) delete hackathon.date;
        if (!hackathon.location) delete hackathon.location;
        if (!hackathon.duration) delete hackathon.duration;
        if (!hackathon.organizer) delete hackathon.organizer;
        if (!hackathon.website) delete hackathon.website;
      }
    }

    // Clean up empty links
    if (projectData.links) {
      Object.keys(projectData.links).forEach(key => {
        if (!projectData.links[key]) {
          delete projectData.links[key];
        }
      });
    }

    // Clean up empty team member fields
    if (projectData.team) {
      projectData.team = projectData.team.map(member => {
        const cleanMember = { ...member };
        if (!cleanMember.github) delete cleanMember.github;
        if (!cleanMember.linkedin) delete cleanMember.linkedin;
        return cleanMember;
      });
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ _id: id, userId: req.user!._id });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error, value } = validateProject(req.body);
    
    if (error) {
      res.status(400).json({ error: error.details[0]?.message || 'Validation error' });
      return;
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, userId: req.user!._id },
      value,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findOneAndDelete({
      _id: id,
      userId: req.user!._id
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};