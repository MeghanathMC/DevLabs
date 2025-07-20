import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All analytics routes require authentication
router.use(authenticate);

router.get('/dashboard', getDashboardStats);

export default router;