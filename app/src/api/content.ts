import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getLearningPaths = async () => {
    const response = await axios.get(`${API_URL}/content/paths`);
    return response.data;
};

export const getTopicsByPath = async (pathId: string) => {
    const response = await axios.get(`${API_URL}/content/paths/${pathId}/topics`);
    return response.data;
};

export const getTopicById = async (topicId: string) => {
    const response = await axios.get(`${API_URL}/content/topics/${topicId}`);
    return response.data;
};

export const getProblemsByTopic = async (topicId: string) => {
    const response = await axios.get(`${API_URL}/content/topics/${topicId}/problems`);
    return response.data;
};

export const getAllProblems = async () => {
    const response = await axios.get(`${API_URL}/content/problems`);
    return response.data;
};

export const getAllTopics = async () => {
    const response = await axios.get(`${API_URL}/content/topics`);
    return response.data;
};
