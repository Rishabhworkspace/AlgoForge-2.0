
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Adjust path to point to backend/.env
dotenv.config({ path: path.join(__dirname, '../../.env') });

import connectDB from '../config/db';
import LearningPath from '../models/LearningPath';
import Topic from '../models/Topic';
import Problem from '../models/Problem';

import { roadmapCategories, topics, problems } from './seedData';

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await LearningPath.deleteMany({});
        await Topic.deleteMany({});
        await Problem.deleteMany({});

        console.log('Seeding Learning Paths...');
        const learningPaths = roadmapCategories.map(cat => ({
            id: cat.id,
            title: cat.title,
            description: cat.description,
            icon: cat.icon,
            color: cat.color,
            order_index: roadmapCategories.indexOf(cat)
        }));
        await LearningPath.insertMany(learningPaths);

        console.log('Seeding Topics...');
        const topicDocs = topics.map(topic => ({
            id: topic.id,
            path_id: topic.category, // Map category -> path_id
            title: topic.title,
            description: topic.description,
            order_index: topic.order_index,
            icon: topic.icon,
            color: topic.color
        }));
        await Topic.insertMany(topicDocs);

        console.log('Seeding Problems...');
        // We need to map problems. The structure in seedData matches the model mostly, 
        // except the model expects 'difficulty' as title case. seedData has uppercase? No, it has Title case 'Medium', 'Easy', 'Hard'.
        // Let's check seedData... yes, 'Medium', 'Easy'.
        // Check if any fields are missing or need mapping.
        // Problem model: title, topic_id, difficulty, video_link, problem_link, description, tags, order_index
        // seedData: same fields.
        await Problem.insertMany(problems);

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data seeding', error);
        process.exit(1);
    }
};

seedData();
