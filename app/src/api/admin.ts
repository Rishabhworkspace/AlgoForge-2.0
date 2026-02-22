import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// ========== DASHBOARD ==========
export const getAdminStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, getAuthHeader());
    return response.data;
};

// ========== USER MANAGEMENT ==========
export const getUsers = async (page = 1, limit = 20, search = '') => {
    const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        ...getAuthHeader(),
        params: { page, limit, search }
    });
    return response.data;
};

export const editUser = async (userId: string, updates: any) => {
    const response = await axios.put(`${API_BASE_URL}/api/admin/users/${userId}`, updates, getAuthHeader());
    return response.data;
};

export const toggleBanUser = async (userId: string) => {
    const response = await axios.put(`${API_BASE_URL}/api/admin/users/${userId}/ban`, {}, getAuthHeader());
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/api/admin/users/${userId}`, getAuthHeader());
    return response.data;
};

// ========== CONTENT MANAGEMENT ==========
export const addProblem = async (problemData: any) => {
    const response = await axios.post(`${API_BASE_URL}/api/admin/problems`, problemData, getAuthHeader());
    return response.data;
};

export const editProblem = async (problemId: string, updates: any) => {
    const response = await axios.put(`${API_BASE_URL}/api/admin/problems/${problemId}`, updates, getAuthHeader());
    return response.data;
};

export const deleteProblem = async (problemId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/api/admin/problems/${problemId}`, getAuthHeader());
    return response.data;
};

// ========== FORUM MODERATION ==========
export const deleteForumPost = async (postId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/api/admin/forum/posts/${postId}`, getAuthHeader());
    return response.data;
};

export const editForumPost = async (postId: string, updates: any) => {
    const response = await axios.put(`${API_BASE_URL}/api/admin/forum/posts/${postId}`, updates, getAuthHeader());
    return response.data;
};

export const deleteForumReply = async (postId: string, replyId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/api/admin/forum/posts/${postId}/replies/${replyId}`, getAuthHeader());
    return response.data;
};
