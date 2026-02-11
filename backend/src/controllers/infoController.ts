import { Request, Response } from 'express';
import User from '../models/User';
import Problem from '../models/Problem';
import LearningPath from '../models/LearningPath';

// @desc    Get system stats
// @route   GET /api/info/stats
// @access  Public
export const getStats = async (req: Request, res: Response) => {
    try {
        const userCount = await User.countDocuments({});
        const problemCount = await Problem.countDocuments({});
        const roadmapCount = await LearningPath.countDocuments({});

        // Count problems with video links
        const videoCount = await Problem.countDocuments({
            video_link: { $exists: true, $ne: null }
        });

        res.status(200).json({
            userCount,
            problemCount,
            roadmapCount,
            videoCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
