import express from 'express';
import { getLeaderboard, getDashboardStats } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.get('/dashboard-stats', protect, getDashboardStats);

export default router;
