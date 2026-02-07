import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getMe, googleAuth } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);

export default router;
