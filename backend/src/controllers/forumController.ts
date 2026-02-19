import { Request, Response } from 'express';
import ForumPost from '../models/ForumPost';

// GET /api/forum — List posts with pagination, category filter, sort
export const getPosts = async (req: Request, res: Response) => {
    try {
        const {
            category,
            sort = 'newest',
            page = '1',
            limit = '20'
        } = req.query;

        const filter: any = {};
        if (category && category !== 'all') {
            filter.category = category;
        }

        let sortOption: any = { isPinned: -1, createdAt: -1 };
        if (sort === 'most-liked') {
            sortOption = { isPinned: -1, likesCount: -1, createdAt: -1 };
        } else if (sort === 'most-discussed') {
            sortOption = { isPinned: -1, repliesCount: -1, createdAt: -1 };
        }

        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;

        // Use aggregation for computed sort fields
        const pipeline: any[] = [
            { $match: filter },
            {
                $addFields: {
                    likesCount: { $size: '$likes' },
                    repliesCount: { $size: '$replies' }
                }
            },
            { $sort: sortOption },
            { $skip: skip },
            { $limit: limitNum },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'authorInfo'
                }
            },
            { $unwind: '$authorInfo' },
            {
                $project: {
                    title: 1,
                    content: { $substr: ['$content', 0, 200] }, // snippet
                    category: 1,
                    tags: 1,
                    likes: 1,
                    likesCount: 1,
                    repliesCount: 1,
                    isPinned: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'authorInfo.name': 1,
                    'authorInfo._id': 1,
                    'authorInfo.avatar': 1
                }
            }
        ];

        const posts = await ForumPost.aggregate(pipeline);
        const total = await ForumPost.countDocuments(filter);

        res.json({
            posts,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            total
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

// GET /api/forum/:id — Get single post with populated replies
export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await ForumPost.findById(req.params.id)
            .populate('author', 'name avatar _id')
            .populate('replies.author', 'name avatar _id');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Failed to fetch post' });
    }
};

// POST /api/forum — Create new post (auth required)
export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, category, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const post = await ForumPost.create({
            title,
            content,
            category: category || 'general',
            tags: tags || [],
            author: req.user._id
        });

        const populated = await post.populate('author', 'name avatar _id');
        res.status(201).json(populated);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

// POST /api/forum/:id/reply — Add reply (auth required)
export const addReply = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Reply content is required' });
        }

        const post = await ForumPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.replies.push({
            content,
            author: req.user._id,
            likes: []
        });

        await post.save();

        const updated = await ForumPost.findById(req.params.id)
            .populate('author', 'name avatar _id')
            .populate('replies.author', 'name avatar _id');

        res.status(201).json(updated);
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: 'Failed to add reply' });
    }
};

// POST /api/forum/:id/like — Toggle like on post (auth required)
export const toggleLike = async (req: Request, res: Response) => {
    try {
        const post = await ForumPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userId = req.user._id.toString();
        const likeIndex = post.likes.findIndex((id: any) => id.toString() === userId);

        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();
        res.json({ likes: post.likes, liked: likeIndex === -1 });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ message: 'Failed to toggle like' });
    }
};

// POST /api/forum/:id/replies/:replyId/like — Toggle like on reply (auth required)
export const toggleReplyLike = async (req: Request, res: Response) => {
    try {
        const post = await ForumPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const reply = post.replies.id(req.params.replyId);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        const userId = req.user._id.toString();
        const likeIndex = reply.likes.findIndex((id: any) => id.toString() === userId);

        if (likeIndex > -1) {
            reply.likes.splice(likeIndex, 1);
        } else {
            reply.likes.push(req.user._id);
        }

        await post.save();
        res.json({ likes: reply.likes, liked: likeIndex === -1 });
    } catch (error) {
        console.error('Error toggling reply like:', error);
        res.status(500).json({ message: 'Failed to toggle reply like' });
    }
};
