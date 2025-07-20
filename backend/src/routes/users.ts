import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  uploadAvatar, 
  updateSettings, 
  getPortfolioSettings, 
  updatePortfolioSettings, 
  deleteAccount 
} from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

// All user routes require authentication
router.use(authenticate);

// Profile management
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/avatar', upload.single('avatar'), uploadAvatar);

// Settings management
router.put('/settings', updateSettings);
router.get('/portfolio-settings', getPortfolioSettings);
router.put('/portfolio-settings', updatePortfolioSettings);

// Account management
router.delete('/account', deleteAccount);

export default router; 