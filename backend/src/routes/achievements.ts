import express from 'express';
import { getAchievements, createAchievement, getAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All achievement routes require authentication
router.use(authenticate);

router.get('/', getAchievements);
router.post('/', createAchievement);
router.get('/:id', getAchievement);
router.put('/:id', updateAchievement);
router.delete('/:id', deleteAchievement);

export default router;