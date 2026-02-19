import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const forumPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        enum: ['general', 'dsa', 'interview', 'system-design', 'career', 'feedback'],
        default: 'general'
    },
    tags: [{
        type: String,
        trim: true
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [replySchema],
    isPinned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for efficient querying
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ createdAt: -1 });

const ForumPost = mongoose.model('ForumPost', forumPostSchema);
export default ForumPost;
