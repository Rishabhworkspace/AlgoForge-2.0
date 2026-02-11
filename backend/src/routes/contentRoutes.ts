import express from 'express';
import {
    getLearningPaths,
    getTopicsByPath,
    getProblemsByTopic,
    getTopicById,
    getAllProblems,
    getAllTopics
} from '../controllers/contentController';

const router = express.Router();

router.get('/paths', getLearningPaths);
router.get('/paths/:pathId/topics', getTopicsByPath);
router.get('/topics', getAllTopics);
router.get('/topics/:topicId', getTopicById);
router.get('/topics/:topicId/problems', getProblemsByTopic);
router.get('/problems', getAllProblems);

export default router;
