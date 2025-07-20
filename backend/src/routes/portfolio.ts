import express from 'express';
import { 
  getPortfolioData, 
  updatePortfolioSettings, 
  getPublicPortfolio, 
  exportPortfolio, 
  getTemplates, 
  generatePreview 
} from '../controllers/portfolioController';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = express.Router();

// Portfolio data and settings (requires authentication)
router.get('/data', authenticate, getPortfolioData);
router.put('/settings', authenticate, updatePortfolioSettings);
router.post('/export', authenticate, exportPortfolio);
router.get('/templates', authenticate, getTemplates);
router.post('/preview', authenticate, generatePreview);

// Public portfolio (optional authentication for view tracking)
router.get('/public/:slug', optionalAuth, getPublicPortfolio);

export default router; 