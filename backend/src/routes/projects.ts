import express from 'express';
import { getProjects, createProject, getProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All project routes require authentication
router.use(authenticate);

router.get('/', getProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;