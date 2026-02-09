import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Get system stats
// @route   GET /api/info/stats
// @access  Public
export const getStats = async (req: Request, res: Response) => {
    try {
        const userCount = await User.countDocuments({});

        res.status(200).json({
            userCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
