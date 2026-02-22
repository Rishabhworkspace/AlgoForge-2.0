import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import {
    getAdminStats,
    getUsers,
    editUser,
    toggleBanUser,
    deleteUser,
    addProblem,
    editProblem,
    deleteProblem,
    deleteForumPost,
    editForumPost,
    deleteForumReply
} from '../controllers/adminController';

const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// Dashboard
router.get('/stats', getAdminStats);

// User Management
router.get('/users', getUsers);
router.put('/users/:id', editUser);
router.put('/users/:id/ban', toggleBanUser);
router.delete('/users/:id', deleteUser);

// Content Management
router.post('/problems', addProblem);
router.put('/problems/:id', editProblem);
router.delete('/problems/:id', deleteProblem);

// Forum Moderation
router.delete('/forum/posts/:id', deleteForumPost);
router.put('/forum/posts/:id', editForumPost);
router.delete('/forum/posts/:postId/replies/:replyId', deleteForumReply);

export default router;
