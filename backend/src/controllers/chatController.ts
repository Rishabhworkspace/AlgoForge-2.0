import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Problem from '../models/Problem';
import Topic from '../models/Topic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are AlgoBot, a friendly and expert AI tutor for Data Structures & Algorithms on the AlgoForge platform.

Your capabilities:
1. **Teach DSA Topics**: Explain concepts clearly with examples, pseudocode, and complexity analysis.
2. **Suggest Practice Problems**: When relevant, recommend specific problems from the AlgoForge catalog (provided below). Always include the problem title and its link.
3. **Help Debug Approaches**: Help users think through their approach to solving problems.
4. **Motivate Learners**: Be encouraging and supportive. Use a warm, professional tone.

Rules:
- Keep responses concise but thorough. Use bullet points and code blocks when helpful.
- When suggesting problems, format them as: **[Problem Title](link)** (Difficulty)
- If a user asks about a topic, first explain the concept briefly, then suggest 3-5 relevant practice problems from the catalog.
- If you don't have relevant problems in the catalog for a topic, say so and still teach the concept.
- Always format code in proper markdown code blocks with language specified.
- Never make up problems that aren't in the catalog below.
`;

export const chat = async (req: Request, res: Response) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API key not configured' });
        }

        // Fetch problems from DB to give context to the AI
        const problems = await Problem.find({}, 'title topic_id difficulty tags problem_link').lean();
        const topics = await Topic.find({}, 'id title').lean();

        // Build a compact problem catalog string
        const topicMap = new Map(topics.map(t => [t.id, t.title]));
        const catalogLines = problems.map(p => {
            const topicName = topicMap.get(p.topic_id) || p.topic_id;
            return `- ${p.title} | ${topicName} | ${p.difficulty} | Tags: ${p.tags.join(', ')} | ${p.problem_link}`;
        });

        const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n## AlgoForge Problem Catalog (${problems.length} problems)\n${catalogLines.join('\n')}`;

        // Build conversation history for Gemini
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const chatHistory = (history || []).map((msg: { role: string; content: string }) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }));

        const chatSession = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: 'System instructions: ' + fullSystemPrompt }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood! I am AlgoBot, ready to help you master DSA. How can I help you today?' }],
                },
                ...chatHistory,
            ],
        });

        const result = await chatSession.sendMessage(message);
        const response = result.response.text();

        res.json({ reply: response });
    } catch (error: any) {
        console.error('Chat error:', error);
        res.status(500).json({
            error: 'Failed to get AI response',
            details: error.message || 'Unknown error',
        });
    }
};
