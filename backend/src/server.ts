import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Connection
connectDB();

// Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);

import infoRoutes from './routes/infoRoutes';
import contentRoutes from './routes/contentRoutes';

import userActionRoutes from './routes/userActionRoutes';
import chatRoutes from './routes/chatRoutes';

app.use('/api/info', infoRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/user-actions', userActionRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('AlgoForge API is running');
});

app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is healthy' });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
