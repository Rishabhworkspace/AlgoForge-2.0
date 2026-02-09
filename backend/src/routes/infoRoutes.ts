import express from 'express';
import { getStats } from '../controllers/infoController';

const router = express.Router();

router.get('/stats', getStats);

export default router;
