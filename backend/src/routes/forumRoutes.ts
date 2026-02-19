import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
    getPosts,
    getPost,
    createPost,
    addReply,
    toggleLike,
    toggleReplyLike
} from '../controllers/forumController';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes (require auth)
router.post('/', protect, createPost);
router.post('/:id/reply', protect, addReply);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/replies/:replyId/like', protect, toggleReplyLike);

export default router;
