import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const sendChatMessage = async (
    message: string,
    history: ChatMessage[],
    token: string
): Promise<string> => {
    const response = await axios.post(
        `${API_BASE_URL}/api/chat`,
        { message, history },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data.reply;
};
