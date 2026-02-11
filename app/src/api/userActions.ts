import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Helper to get token (assuming specific storage key, adjust as needed)
const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // or use your auth context method
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const updateProblemStatus = async (problemId: string, status: 'TODO' | 'SOLVED' | 'ATTEMPTED') => {
    const response = await axios.post(`${API_BASE_URL}/api/user-actions/problems/${problemId}/status`, { status }, getAuthHeader());
    return response.data;
};

export const toggleBookmark = async (problemId: string) => {
    const response = await axios.post(`${API_BASE_URL}/api/user-actions/problems/${problemId}/bookmark`, {}, getAuthHeader());
    return response.data;
};

export const updateNotes = async (problemId: string, notes: string) => {
    const response = await axios.put(`${API_BASE_URL}/api/user-actions/problems/${problemId}/notes`, { notes }, getAuthHeader());
    return response.data;
};

export const getUserProgress = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/user-actions/progress`, getAuthHeader());
    return response.data;
};
