import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export interface ForumPostSummary {
    _id: string;
    title: string;
    content: string; // snippet
    category: string;
    tags: string[];
    likes: string[];
    likesCount: number;
    repliesCount: number;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
    authorInfo: {
        _id: string;
        name: string;
        avatar?: string;
    };
}

export interface ForumReply {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        avatar?: string;
    };
    likes: string[];
    createdAt: string;
}

export interface ForumPostFull {
    _id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    likes: string[];
    replies: ForumReply[];
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
    author: {
        _id: string;
        name: string;
        avatar?: string;
    };
}

export interface PostsResponse {
    posts: ForumPostSummary[];
    totalPages: number;
    currentPage: number;
    total: number;
}

export const getPosts = async (
    category?: string,
    sort?: string,
    page?: number
): Promise<PostsResponse> => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (sort) params.append('sort', sort);
    if (page) params.append('page', page.toString());

    const response = await axios.get(`${API_BASE_URL}/api/forum?${params.toString()}`);
    return response.data;
};

export const getPost = async (id: string): Promise<ForumPostFull> => {
    const response = await axios.get(`${API_BASE_URL}/api/forum/${id}`);
    return response.data;
};

export const createPost = async (data: {
    title: string;
    content: string;
    category: string;
    tags?: string[];
}): Promise<ForumPostFull> => {
    const response = await axios.post(`${API_BASE_URL}/api/forum`, data, getAuthHeader());
    return response.data;
};

export const addReply = async (postId: string, content: string): Promise<ForumPostFull> => {
    const response = await axios.post(
        `${API_BASE_URL}/api/forum/${postId}/reply`,
        { content },
        getAuthHeader()
    );
    return response.data;
};

export const togglePostLike = async (postId: string) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/forum/${postId}/like`,
        {},
        getAuthHeader()
    );
    return response.data;
};

export const toggleReplyLike = async (postId: string, replyId: string) => {
    const response = await axios.post(
        `${API_BASE_URL}/api/forum/${postId}/replies/${replyId}/like`,
        {},
        getAuthHeader()
    );
    return response.data;
};
