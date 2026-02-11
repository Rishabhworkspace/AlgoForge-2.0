import { Request, Response } from 'express';
import UserProgress from '../models/UserProgress';
import User from '../models/User';

// Middleware adds user to req (req.user) - we need to define types for this or use 'any' for now if not strictly typed in this project yet
// Assuming authMiddleware populates req.user.id

// @desc    Update problem status (TODO, DOLVED, ATTEMPTED)
// @route   POST /api/user-actions/problems/:problemId/status
// @access  Private
export const updateProblemStatus = async (req: Request | any, res: Response) => {
    try {
        const { problemId } = req.params;
        const { status } = req.body;
        const userId = req.user._id; // types need adjustment if strict

        let progress = await UserProgress.findOne({ user_id: userId, problem_id: problemId });
        const previousStatus = progress ? progress.status : 'TODO';

        if (progress) {
            progress.status = status;
            await progress.save();
        } else {
            progress = await UserProgress.create({
                user_id: userId,
                problem_id: problemId,
                status,
                is_bookmarked: false,
                notes: ''
            });
        }

        // Sync with User model for Leaderboard & Profile
        if (status === 'SOLVED' && previousStatus !== 'SOLVED') {
            await User.findByIdAndUpdate(userId, {
                $inc: { xp_points: 25 },
                $addToSet: { solvedProblems: { problemId: problemId, solvedAt: new Date() } }
            });
        } else if (status !== 'SOLVED' && previousStatus === 'SOLVED') {
            await User.findByIdAndUpdate(userId, {
                $inc: { xp_points: -25 },
                $pull: { solvedProblems: { problemId: problemId } }
            });
        }

        res.json(progress);
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Toggle bookmark
// @route   POST /api/user-actions/problems/:problemId/bookmark
// @access  Private
export const toggleBookmark = async (req: Request | any, res: Response) => {
    try {
        const { problemId } = req.params;
        const userId = req.user._id;

        let progress = await UserProgress.findOne({ user_id: userId, problem_id: problemId });
        let isBookmarked = false;

        if (progress) {
            progress.is_bookmarked = !progress.is_bookmarked;
            isBookmarked = progress.is_bookmarked;
            await progress.save();
        } else {
            progress = await UserProgress.create({
                user_id: userId,
                problem_id: problemId,
                status: 'TODO',
                is_bookmarked: true,
                notes: ''
            });
            isBookmarked = true;
        }

        // Sync with User model
        if (isBookmarked) {
            await User.findByIdAndUpdate(userId, {
                $addToSet: { bookmarks: problemId }
            });
        } else {
            await User.findByIdAndUpdate(userId, {
                $pull: { bookmarks: problemId }
            });
        }

        res.json(progress);
    } catch (error) {
        console.error("Error toggling bookmark:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update notes
// @route   PUT /api/user-actions/problems/:problemId/notes
// @access  Private
export const updateNotes = async (req: Request | any, res: Response) => {
    try {
        const { problemId } = req.params;
        const { notes } = req.body;
        const userId = req.user._id;

        let progress = await UserProgress.findOne({ user_id: userId, problem_id: problemId });

        if (progress) {
            progress.notes = notes;
            await progress.save();
        } else {
            progress = await UserProgress.create({
                user_id: userId,
                problem_id: problemId,
                status: 'TODO',
                is_bookmarked: false,
                notes
            });
        }

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user progress for all problems (or filter by topic if we want optimization)
// @route   GET /api/user-actions/progress
// @access  Private
export const getUserProgress = async (req: Request | any, res: Response) => {
    try {
        const userId = req.user._id;
        const progress = await UserProgress.find({ user_id: userId });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
