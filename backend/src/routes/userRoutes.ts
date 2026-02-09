import express from 'express';
import { getLeaderboard } from '../controllers/userController';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);

export default router;
