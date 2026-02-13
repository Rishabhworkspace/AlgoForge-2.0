import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Problem from '../models/Problem';
import Topic from '../models/Topic';

const SYSTEM_PROMPT = `You are AlgoBot, a friendly and expert AI tutor for Data Structures & Algorithms on the AlgoForge platform.

Your capabilities:
1. **Teach DSA Topics**: Explain concepts clearly with examples, pseudocode, and complexity analysis.
2. **Suggest Practice Problems**: When relevant, recommend specific problems from the AlgoForge catalog.
3. **Help Debug Approaches**: Help users think through their approach to solving problems.

Rules:
- Keep responses concise but thorough.
- When suggesting problems, format them as: **[Problem Title](link)** (Difficulty)
- If a user asks about a topic, first explain the concept briefly, then suggest 3-5 relevant practice problems from the catalog.
- Always format code in proper markdown code blocks.
`;

export const chat = async (req: Request, res: Response) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Fetch problems and build catalog
        const problems = await Problem.find({}, 'title topic_id difficulty tags problem_link').lean();
        const topics = await Topic.find({}, 'id title').lean();
        const topicMap = new Map(topics.map(t => [t.id, t.title]));

        const catalogLines = problems.map(p => {
            const topicName = topicMap.get(p.topic_id) || p.topic_id;
            return `- ${p.title} | ${topicName} | ${p.difficulty} | Link: ${p.problem_link}`;
        });

        const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n## PROBLEM CATALOG:\n${catalogLines.join('\n')}`;

        // gemini-2.5-flash — confirmed working with free tier
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: fullSystemPrompt,
        });

        // Map history to Gemini format
        const chatHistory = (history || []).map((msg: { role: string; content: string }) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }));

        const chatSession = model.startChat({
            history: chatHistory,
        });

        const result = await chatSession.sendMessage(message);
        const response = result.response.text();

        res.json({ reply: response });
    } catch (error: any) {
        console.error('Gemini Chat Error:', error);
        // Clean up error message for frontend
        const detailedError = error.message || error.toString();

        // Check for common issues
        let userMessage = 'Failed to get AI response';
        if (detailedError.includes('API key')) userMessage = 'Invalid API Key';
        if (detailedError.includes('quota')) userMessage = 'Rate limit exceeded';
        if (detailedError.includes('location')) userMessage = 'Gemini not available in your region';

        res.status(500).json({
            error: userMessage,
            details: detailedError // Send full details for debugging
        });
    }
};
