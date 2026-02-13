import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { chat } from '../controllers/chatController';

const router = express.Router();

// POST /api/chat — requires authentication
router.post('/', protect, chat);

export default router;
