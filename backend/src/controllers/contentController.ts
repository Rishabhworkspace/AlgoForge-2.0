import { Request, Response } from 'express';
import LearningPath from '../models/LearningPath';
import Topic from '../models/Topic';
import Problem from '../models/Problem';

// @desc    Get all learning paths
// @route   GET /api/content/paths
// @access  Public
export const getLearningPaths = async (req: Request, res: Response) => {
    try {
        const paths = await LearningPath.find().sort({ order_index: 1 }).lean();

        const pathsWithCounts = await Promise.all(paths.map(async (path: any) => {
            const topics = await Topic.find({ path_id: path.id }).select('id');
            const topicIds = topics.map(t => t.id);
            const totalProblems = await Problem.countDocuments({ topic_id: { $in: topicIds } });
            return { ...path, totalProblems };
        }));

        res.json(pathsWithCounts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get topics by learning path ID (slug)
// @route   GET /api/content/paths/:pathId/topics
// @access  Public
export const getTopicsByPath = async (req: Request, res: Response) => {
    try {
        const { pathId } = req.params;
        const topics = await Topic.find({ path_id: pathId }).sort({ order_index: 1 });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get topic by ID (slug)
// @route   GET /api/content/topics/:topicId
// @access  Public
export const getTopicById = async (req: Request, res: Response) => {
    try {
        const { topicId } = req.params;
        const topic = await Topic.findOne({ id: topicId });
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all topics
// @route   GET /api/content/topics
// @access  Public
export const getAllTopics = async (req: Request, res: Response) => {
    try {
        const topics = await Topic.find().sort({ order_index: 1 });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get problems by topic ID (slug)
// @route   GET /api/content/topics/:topicId/problems
// @access  Public (Authenticated user will get progress status later)
export const getProblemsByTopic = async (req: Request, res: Response) => {
    try {
        const { topicId } = req.params;
        const problems = await Problem.find({ topic_id: topicId }).sort({ order_index: 1 });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all problems
// @route   GET /api/content/problems
// @access  Public
export const getAllProblems = async (req: Request, res: Response) => {
    try {
        const problems = await Problem.find().sort({ order_index: 1 });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
