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
            // Update XP and solved list
            const userDoc: any = await User.findById(userId);
            if (userDoc) {
                userDoc.xp_points = (userDoc.xp_points || 0) + 25;
                userDoc.solvedProblems = userDoc.solvedProblems || [];
                userDoc.solvedProblems.push({ problemId: problemId, solvedAt: new Date() });

                // --- Streak Logic ---
                const today = new Date();
                const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
                const lastActive = userDoc.last_active ? new Date(userDoc.last_active) : null;
                const lastActiveStr = lastActive ? lastActive.toISOString().split('T')[0] : null;

                if (lastActiveStr === todayStr) {
                    // Same day — streak unchanged
                } else if (lastActiveStr) {
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];
                    if (lastActiveStr === yesterdayStr) {
                        // Consecutive day — increment streak
                        userDoc.streak_days = (userDoc.streak_days || 0) + 1;
                    } else {
                        // Gap — reset streak to 1
                        userDoc.streak_days = 1;
                    }
                } else {
                    // First activity ever
                    userDoc.streak_days = 1;
                }
                userDoc.last_active = today;

                // --- Activity Log ---
                userDoc.activityLog = userDoc.activityLog || [];
                const todayLog = userDoc.activityLog.find((log: any) => log.date === todayStr);
                if (todayLog) {
                    todayLog.count += 1;
                } else {
                    userDoc.activityLog.push({ date: todayStr, count: 1 });
                }

                await userDoc.save();
            }
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
