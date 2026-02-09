import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Get leaderboard data
// @route   GET /api/users/leaderboard
// @access  Public
export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const { limit = 10, sortBy = 'xp' } = req.query;

        let sortCriteria: any = {};
        if (sortBy === 'streak') {
            sortCriteria = { streak_days: -1 };
        } else if (sortBy === 'solved') {
            // Since solvedProblems is an array, we can't directly sort by length in standard MongoDB sort without aggregation.
            // For simplicity in this iteration, we'll sort by xp as primary, then filter/sort in memory if needed, 
            // OR strictly support fields that are numbers on the document.
            // Let's stick to simple field sorting for now.
            // A better approach for 'solved' is to maintain a 'solvedCount' field on the user model, 
            // but for now let's assume valid sorting fields are 'xp_points' and 'streak_days'.
            // If sortBy is 'solved', we might need an aggregation pipeline.
            // Let's implement aggregation for robust sorting.
            sortCriteria = { solvedCount: -1 }; // We'll need to compute this or just use XP for now if complex.
            // Actually, let's use aggregation to project the size and sort.
        } else {
            sortCriteria = { xp_points: -1 };
        }

        // Using aggregation to handle array length sorting if needed, or just standard find.
        // For 'solved', we need the size of the solvedProblems array.

        let pipeline: any[] = [];

        // Project necessary fields + computed fields
        pipeline.push({
            $project: {
                name: 1,
                xp_points: 1,
                streak_days: 1,
                solvedProblems: 1,
                avatar: 1, // field might not exist yet, but in schema it's there? check schema.
                solvedCount: { $size: { $ifNull: ["$solvedProblems", []] } }
            }
        });

        // Sort stage
        if (sortBy === 'solved') {
            pipeline.push({ $sort: { solvedCount: -1 } });
        } else if (sortBy === 'streak') {
            pipeline.push({ $sort: { streak_days: -1 } });
        } else {
            pipeline.push({ $sort: { xp_points: -1 } });
        }

        // Limit stage
        pipeline.push({ $limit: Number(limit) });

        const leaderboard = await User.aggregate(pipeline);

        // Transform for frontend if necessary (e.g. generate avatar initials if missing)
        const formattedLeaderboard = leaderboard.map((user, index) => ({
            id: user._id,
            name: user.name,
            avatar: user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U',
            xp: user.xp_points || 0,
            streak: user.streak_days || 0,
            solved: user.solvedCount || 0,
            rank: index + 1
        }));

        res.status(200).json(formattedLeaderboard);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
