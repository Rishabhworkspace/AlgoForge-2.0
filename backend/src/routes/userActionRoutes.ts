import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { updateProblemStatus, toggleBookmark, updateNotes, getUserProgress } from '../controllers/userActionController';

const router = express.Router();

router.use(protect); // All routes private

router.post('/problems/:problemId/status', updateProblemStatus);
router.post('/problems/:problemId/bookmark', toggleBookmark);
router.put('/problems/:problemId/notes', updateNotes);
router.get('/progress', getUserProgress);

export default router;
