import { Request, Response } from 'express';
import User from '../models/User';
import Problem from '../models/Problem';
import Topic from '../models/Topic';
import LearningPath from '../models/LearningPath';
import ForumPost from '../models/ForumPost';
import UserProgress from '../models/UserProgress';

// ========== DASHBOARD STATS ==========

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin
export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        const [totalUsers, totalProblems, totalPosts, totalTopics, totalPaths] = await Promise.all([
            User.countDocuments({}),
            Problem.countDocuments({}),
            ForumPost.countDocuments({}),
            Topic.countDocuments({}),
            LearningPath.countDocuments({})
        ]);

        const activeToday = await User.countDocuments({
            last_active: { $gte: new Date(todayStr) }
        });

        const bannedUsers = await User.countDocuments({ isBanned: true });

        res.json({
            totalUsers,
            totalProblems,
            totalPosts,
            totalTopics,
            totalPaths,
            activeToday,
            bannedUsers
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ========== USER MANAGEMENT ==========

// @desc    Get all users (paginated, searchable)
// @route   GET /api/admin/users
// @access  Admin
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page = '1', limit = '20', search = '' } = req.query;
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;

        const filter: any = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const [users, total] = await Promise.all([
            User.find(filter)
                .select('-password')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum)
                .lean(),
            User.countDocuments(filter)
        ]);

        res.json({
            users,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            total
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Edit user data
// @route   PUT /api/admin/users/:id
// @access  Admin
export const editUser = async (req: Request, res: Response) => {
    try {
        const { name, xp_points, streak_days, role } = req.body;
        const updates: any = {};

        if (name !== undefined) updates.name = name;
        if (xp_points !== undefined) updates.xp_points = xp_points;
        if (streak_days !== undefined) updates.streak_days = streak_days;
        if (role !== undefined) updates.role = role;

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Edit user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Ban/unban user
// @route   PUT /api/admin/users/:id/ban
// @access  Admin
export const toggleBanUser = async (req: Request, res: Response) => {
    try {
        const user: any = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent banning yourself
        if (user._id.toString() === (req as any).user._id.toString()) {
            return res.status(400).json({ message: 'Cannot ban yourself' });
        }

        user.isBanned = !user.isBanned;
        await user.save();

        res.json({ isBanned: user.isBanned, message: user.isBanned ? 'User banned' : 'User unbanned' });
    } catch (error) {
        console.error('Ban user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Admin
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deleting yourself
        if (user._id.toString() === (req as any).user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete yourself' });
        }

        // Delete user progress
        await UserProgress.deleteMany({ user_id: user._id });
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ========== CONTENT MANAGEMENT ==========

// @desc    Add a problem to a topic
// @route   POST /api/admin/problems
// @access  Admin
export const addProblem = async (req: Request, res: Response) => {
    try {
        const { title, topic_id, difficulty, video_link, problem_link, description, tags, order_index } = req.body;

        if (!title || !topic_id || !difficulty || !description) {
            return res.status(400).json({ message: 'Title, topic_id, difficulty, and description are required' });
        }

        // Verify topic exists
        const topic = await Topic.findOne({ id: topic_id });
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Auto-calculate order_index if not provided
        let finalOrderIndex = order_index;
        if (finalOrderIndex === undefined) {
            const maxProblem = await Problem.findOne({ topic_id }).sort({ order_index: -1 });
            finalOrderIndex = maxProblem ? maxProblem.order_index + 1 : 1;
        }

        const problem = await Problem.create({
            title,
            topic_id,
            difficulty,
            video_link: video_link || '',
            problem_link: problem_link || '',
            description,
            tags: tags || [],
            order_index: finalOrderIndex
        });

        res.status(201).json(problem);
    } catch (error) {
        console.error('Add problem error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Edit a problem
// @route   PUT /api/admin/problems/:id
// @access  Admin
export const editProblem = async (req: Request, res: Response) => {
    try {
        const { title, difficulty, video_link, problem_link, description, tags, order_index } = req.body;
        const updates: any = {};

        if (title !== undefined) updates.title = title;
        if (difficulty !== undefined) updates.difficulty = difficulty;
        if (video_link !== undefined) updates.video_link = video_link;
        if (problem_link !== undefined) updates.problem_link = problem_link;
        if (description !== undefined) updates.description = description;
        if (tags !== undefined) updates.tags = tags;
        if (order_index !== undefined) updates.order_index = order_index;

        const problem = await Problem.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        res.json(problem);
    } catch (error) {
        console.error('Edit problem error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a problem
// @route   DELETE /api/admin/problems/:id
// @access  Admin
export const deleteProblem = async (req: Request, res: Response) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        // Clean up user progress for this problem
        await UserProgress.deleteMany({ problem_id: problem._id });

        res.json({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.error('Delete problem error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// ========== FORUM MODERATION ==========

// @desc    Delete forum post
// @route   DELETE /api/admin/forum/posts/:id
// @access  Admin
export const deleteForumPost = async (req: Request, res: Response) => {
    try {
        const post = await ForumPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Edit forum post
// @route   PUT /api/admin/forum/posts/:id
// @access  Admin
export const editForumPost = async (req: Request, res: Response) => {
    try {
        const { title, content, category, isPinned } = req.body;
        const updates: any = {};

        if (title !== undefined) updates.title = title;
        if (content !== undefined) updates.content = content;
        if (category !== undefined) updates.category = category;
        if (isPinned !== undefined) updates.isPinned = isPinned;

        const post = await ForumPost.findByIdAndUpdate(req.params.id, updates, { new: true })
            .populate('author', 'name avatar _id');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Edit post error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a reply from a forum post
// @route   DELETE /api/admin/forum/posts/:postId/replies/:replyId
// @access  Admin
export const deleteForumReply = async (req: Request, res: Response) => {
    try {
        const post = await ForumPost.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const reply = post.replies.id(req.params.replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        reply.deleteOne();
        await post.save();

        res.json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.error('Delete reply error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
