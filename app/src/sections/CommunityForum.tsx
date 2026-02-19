import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    MessageSquare,
    Heart,
    Send,
    Plus,
    X,
    Clock,
    Filter,
    TrendingUp,
    Flame,
    ChevronDown,
    ChevronUp,
    Loader2,
    Pin,
    Code2,
    Briefcase,
    Cpu,
    Compass,
    MessageCircle,
    HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
    getPosts,
    getPost,
    createPost,
    addReply,
    togglePostLike,
    toggleReplyLike,
} from '@/api/forum';
import type {
    ForumPostSummary,
    ForumPostFull
} from '@/api/forum';

interface CommunityForumProps {
    onBack: () => void;
    onAuthClick: (mode: 'login' | 'signup') => void;
}

const categories = [
    { id: 'all', label: 'All Topics', icon: Filter, color: '#a088ff' },
    { id: 'general', label: 'General', icon: MessageCircle, color: '#63e3ff' },
    { id: 'dsa', label: 'DSA', icon: Code2, color: '#ff8a63' },
    { id: 'interview', label: 'Interview', icon: Briefcase, color: '#88ff9f' },
    { id: 'system-design', label: 'System Design', icon: Cpu, color: '#ff88c9' },
    { id: 'career', label: 'Career', icon: Compass, color: '#ffd700' },
    { id: 'feedback', label: 'Feedback', icon: HelpCircle, color: '#a0e8ff' }
];

const sortOptions = [
    { id: 'newest', label: 'Newest', icon: Clock },
    { id: 'most-liked', label: 'Most Liked', icon: TrendingUp },
    { id: 'most-discussed', label: 'Most Discussed', icon: Flame }
];

function timeAgo(dateStr: string): string {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}

function getCategoryColor(cat: string): string {
    const found = categories.find(c => c.id === cat);
    return found?.color || '#a088ff';
}

export function CommunityForum({ onBack, onAuthClick }: CommunityForumProps) {
    const { user } = useAuth();

    // List state
    const [posts, setPosts] = useState<ForumPostSummary[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSort, setActiveSort] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // Detail state
    const [selectedPost, setSelectedPost] = useState<ForumPostFull | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replySubmitting, setReplySubmitting] = useState(false);

    // Create post state
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newCategory, setNewCategory] = useState('general');
    const [createSubmitting, setCreateSubmitting] = useState(false);

    // Fetch posts
    useEffect(() => {
        fetchPosts();
    }, [activeCategory, activeSort, currentPage]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await getPosts(activeCategory, activeSort, currentPage);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Failed to fetch posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenPost = async (postId: string) => {
        setDetailLoading(true);
        try {
            const data = await getPost(postId);
            setSelectedPost(data);
        } catch (err) {
            console.error('Failed to fetch post:', err);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleCreatePost = async () => {
        if (!user) {
            onAuthClick('login');
            return;
        }
        if (!newTitle.trim() || !newContent.trim()) return;

        setCreateSubmitting(true);
        try {
            await createPost({
                title: newTitle.trim(),
                content: newContent.trim(),
                category: newCategory
            });
            setNewTitle('');
            setNewContent('');
            setNewCategory('general');
            setShowCreateForm(false);
            fetchPosts();
        } catch (err) {
            console.error('Failed to create post:', err);
        } finally {
            setCreateSubmitting(false);
        }
    };

    const handleReply = async () => {
        if (!user) {
            onAuthClick('login');
            return;
        }
        if (!selectedPost || !replyText.trim()) return;

        setReplySubmitting(true);
        try {
            const updated = await addReply(selectedPost._id, replyText.trim());
            setSelectedPost(updated);
            setReplyText('');
        } catch (err) {
            console.error('Failed to add reply:', err);
        } finally {
            setReplySubmitting(false);
        }
    };

    const handleLikePost = async (postId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!user) {
            onAuthClick('login');
            return;
        }
        try {
            const result = await togglePostLike(postId);
            if (selectedPost && selectedPost._id === postId) {
                setSelectedPost({ ...selectedPost, likes: result.likes });
            }
            setPosts(prev => prev.map(p =>
                p._id === postId ? { ...p, likes: result.likes, likesCount: result.likes.length } : p
            ));
        } catch (err) {
            console.error('Failed to like post:', err);
        }
    };

    const handleLikeReply = async (replyId: string) => {
        if (!user || !selectedPost) {
            onAuthClick('login');
            return;
        }
        try {
            const result = await toggleReplyLike(selectedPost._id, replyId);
            setSelectedPost({
                ...selectedPost,
                replies: selectedPost.replies.map(r =>
                    r._id === replyId ? { ...r, likes: result.likes } : r
                )
            });
        } catch (err) {
            console.error('Failed to like reply:', err);
        }
    };

    // Post detail view
    if (selectedPost || detailLoading) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 isometric-pattern opacity-20 fixed pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Button
                        variant="ghost"
                        onClick={() => { setSelectedPost(null); setReplyText(''); }}
                        className="mb-6 text-white/60 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Forum
                    </Button>

                    {detailLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-[#a088ff] animate-spin" />
                        </div>
                    ) : selectedPost && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Post Content */}
                            <div className="glass rounded-3xl p-8 border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md mb-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                                        style={{
                                            background: `${getCategoryColor(selectedPost.category)}20`,
                                            color: getCategoryColor(selectedPost.category)
                                        }}
                                    >
                                        {selectedPost.author?.name?.slice(0, 2).toUpperCase() || '??'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h1 className="text-2xl font-bold text-white mb-1">
                                            {selectedPost.isPinned && <Pin className="w-4 h-4 inline mr-2 text-[#ffd700]" />}
                                            {selectedPost.title}
                                        </h1>
                                        <div className="flex items-center gap-3 text-sm text-white/50">
                                            <span className="font-medium text-white/70">{selectedPost.author?.name}</span>
                                            <span>·</span>
                                            <span>{timeAgo(selectedPost.createdAt)}</span>
                                            <span>·</span>
                                            <span
                                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                                style={{
                                                    background: `${getCategoryColor(selectedPost.category)}20`,
                                                    color: getCategoryColor(selectedPost.category)
                                                }}
                                            >
                                                {selectedPost.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-white/80 leading-relaxed whitespace-pre-wrap mb-6">
                                    {selectedPost.content}
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => handleLikePost(selectedPost._id)}
                                        className={`flex items-center gap-2 text-sm transition-colors ${user && selectedPost.likes.includes(user.id)
                                            ? 'text-red-400'
                                            : 'text-white/50 hover:text-red-400'
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${user && selectedPost.likes.includes(user.id) ? 'fill-current' : ''}`} />
                                        {selectedPost.likes.length}
                                    </button>
                                    <span className="flex items-center gap-2 text-sm text-white/50">
                                        <MessageSquare className="w-4 h-4" />
                                        {selectedPost.replies.length} replies
                                    </span>
                                </div>
                            </div>

                            {/* Replies */}
                            <div className="space-y-4 mb-6">
                                {selectedPost.replies.map((reply, idx) => (
                                    <motion.div
                                        key={reply._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="glass rounded-2xl p-5 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md ml-6"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                                style={{
                                                    background: '#a088ff20',
                                                    color: '#a088ff'
                                                }}
                                            >
                                                {reply.author?.name?.slice(0, 2).toUpperCase() || '??'}
                                            </div>
                                            <div>
                                                <span className="text-white/80 text-sm font-medium">{reply.author?.name}</span>
                                                <span className="text-white/30 text-xs ml-2">{timeAgo(reply.createdAt)}</span>
                                            </div>
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap mb-3">
                                            {reply.content}
                                        </p>
                                        <button
                                            onClick={() => handleLikeReply(reply._id)}
                                            className={`flex items-center gap-1.5 text-xs transition-colors ${user && reply.likes.includes(user.id)
                                                ? 'text-red-400'
                                                : 'text-white/40 hover:text-red-400'
                                                }`}
                                        >
                                            <Heart className={`w-3 h-3 ${user && reply.likes.includes(user.id) ? 'fill-current' : ''}`} />
                                            {reply.likes.length}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Reply Input */}
                            <div className="glass rounded-2xl p-5 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md">
                                {user ? (
                                    <div className="flex gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                            style={{ background: '#a088ff20', color: '#a088ff' }}
                                        >
                                            {user.name?.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                value={replyText}
                                                onChange={e => setReplyText(e.target.value)}
                                                placeholder="Write a reply..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#a088ff]/50 resize-none min-h-[80px]"
                                            />
                                            <div className="flex justify-end mt-2">
                                                <Button
                                                    onClick={handleReply}
                                                    disabled={!replyText.trim() || replySubmitting}
                                                    className="bg-[#a088ff] hover:bg-[#8f76fa] text-white text-sm"
                                                    size="sm"
                                                >
                                                    {replySubmitting ? (
                                                        <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                                    ) : (
                                                        <Send className="w-4 h-4 mr-1" />
                                                    )}
                                                    Reply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-white/50 text-sm mb-3">Sign in to join the conversation</p>
                                        <Button
                                            onClick={() => onAuthClick('login')}
                                            className="bg-[#a088ff] hover:bg-[#8f76fa] text-white text-sm"
                                            size="sm"
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        );
    }

    // Forum list view
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 isometric-pattern opacity-20 fixed pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-6 text-white/60 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="font-display text-4xl sm:text-5xl text-white mb-3">
                        Community <span className="gradient-text">Forum</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Ask questions, share solutions, and learn from fellow developers.
                    </p>
                </motion.div>

                {/* Top Bar: Categories + Sort + New Post */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setActiveCategory(cat.id); setCurrentPage(1); }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                    ? 'text-white shadow-lg'
                                    : 'text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10'
                                    }`}
                                style={activeCategory === cat.id ? {
                                    background: `${cat.color}30`,
                                    color: cat.color,
                                    boxShadow: `0 0 20px ${cat.color}20`
                                } : {}}
                            >
                                <cat.icon className="w-3.5 h-3.5" />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Sort + New Post */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            {sortOptions.map(sort => (
                                <button
                                    key={sort.id}
                                    onClick={() => { setActiveSort(sort.id); setCurrentPage(1); }}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeSort === sort.id
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    <sort.icon className="w-3 h-3" />
                                    {sort.label}
                                </button>
                            ))}
                        </div>

                        <Button
                            onClick={() => {
                                if (!user) { onAuthClick('login'); return; }
                                setShowCreateForm(true);
                            }}
                            className="bg-[#a088ff] hover:bg-[#8f76fa] text-white text-sm"
                            size="sm"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            New Post
                        </Button>
                    </div>
                </motion.div>

                {/* Create Post Form */}
                <AnimatePresence>
                    {showCreateForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-6"
                        >
                            <div className="glass rounded-2xl p-6 border border-[#a088ff]/20 bg-[#0a0a0a]/60 backdrop-blur-md">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">Create New Post</h3>
                                    <button onClick={() => setShowCreateForm(false)} className="text-white/40 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <input
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    placeholder="Post title..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#a088ff]/50 mb-3"
                                />

                                <textarea
                                    value={newContent}
                                    onChange={e => setNewContent(e.target.value)}
                                    placeholder="What's on your mind? Share your thoughts, questions, or solutions..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#a088ff]/50 resize-none min-h-[120px] mb-3"
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white/40 text-xs">Category:</span>
                                        <select
                                            value={newCategory}
                                            onChange={e => setNewCategory(e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#a088ff]/50 appearance-none cursor-pointer"
                                        >
                                            {categories.filter(c => c.id !== 'all').map(c => (
                                                <option key={c.id} value={c.id} className="bg-[#1a1a1a]">{c.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <Button
                                        onClick={handleCreatePost}
                                        disabled={!newTitle.trim() || !newContent.trim() || createSubmitting}
                                        className="bg-[#a088ff] hover:bg-[#8f76fa] text-white text-sm"
                                        size="sm"
                                    >
                                        {createSubmitting ? (
                                            <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                        ) : (
                                            <Send className="w-4 h-4 mr-1" />
                                        )}
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Posts List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#a088ff] animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <MessageSquare className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl text-white/60 mb-2">No posts yet</h3>
                        <p className="text-white/40 text-sm mb-6">Be the first to start a discussion!</p>
                        <Button
                            onClick={() => {
                                if (!user) { onAuthClick('login'); return; }
                                setShowCreateForm(true);
                            }}
                            className="bg-[#a088ff] hover:bg-[#8f76fa] text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Post
                        </Button>
                    </motion.div>
                ) : (
                    <div className="space-y-3">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.04 }}
                                onClick={() => handleOpenPost(post._id)}
                                className="glass rounded-2xl p-5 border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md cursor-pointer hover:border-white/10 hover:bg-[#0a0a0a]/60 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Author Avatar */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                                        style={{
                                            background: `${getCategoryColor(post.category)}20`,
                                            color: getCategoryColor(post.category)
                                        }}
                                    >
                                        {post.authorInfo?.name?.slice(0, 2).toUpperCase() || '??'}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        {/* Title */}
                                        <div className="flex items-center gap-2 mb-1">
                                            {post.isPinned && <Pin className="w-3.5 h-3.5 text-[#ffd700] flex-shrink-0" />}
                                            <h3 className="text-white font-semibold group-hover:text-[#a088ff] transition-colors truncate">
                                                {post.title}
                                            </h3>
                                        </div>

                                        {/* Author + time + category */}
                                        <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                                            <span className="text-white/60">{post.authorInfo?.name}</span>
                                            <span>·</span>
                                            <span>{timeAgo(post.createdAt)}</span>
                                            <span>·</span>
                                            <span
                                                className="px-1.5 py-0.5 rounded-full text-xs"
                                                style={{
                                                    background: `${getCategoryColor(post.category)}15`,
                                                    color: getCategoryColor(post.category)
                                                }}
                                            >
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Snippet */}
                                        <p className="text-white/50 text-sm line-clamp-2 mb-3">
                                            {post.content}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={(e) => handleLikePost(post._id, e)}
                                                className={`flex items-center gap-1.5 text-xs transition-colors ${user && post.likes.includes(user.id)
                                                    ? 'text-red-400'
                                                    : 'text-white/40 hover:text-red-400'
                                                    }`}
                                            >
                                                <Heart className={`w-3.5 h-3.5 ${user && post.likes.includes(user.id) ? 'fill-current' : ''}`} />
                                                {post.likesCount}
                                            </button>
                                            <span className="flex items-center gap-1.5 text-xs text-white/40">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                {post.repliesCount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="text-white/50 hover:text-white"
                        >
                            <ChevronUp className="w-4 h-4 rotate-[-90deg]" />
                        </Button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                        ? 'bg-[#a088ff] text-white'
                                        : 'text-white/40 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="text-white/50 hover:text-white"
                        >
                            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
