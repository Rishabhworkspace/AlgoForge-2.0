
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Adjust path to point to backend/.env
dotenv.config({ path: path.join(__dirname, '../../.env') });

import connectDB from '../config/db';
import LearningPath from '../models/LearningPath';
import Topic from '../models/Topic';
import Problem from '../models/Problem';

import { roadmapCategories, topics } from './seedData';
import { dsaProblems } from './data/dsa';
import { algoProblems } from './data/algo';
import { dpProblems } from './data/dp';
import { graphProblems } from './data/graphs';
import { interviewProblems } from './data/interview';
import { systemDesignProblems } from './data/system-design';

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

        console.log('Seeding Problems from Extended Data...');
        const allRawProblems = [
            ...dsaProblems,
            ...algoProblems,
            ...dpProblems,
            ...graphProblems,
            ...interviewProblems,
            ...systemDesignProblems
        ];

        // Map raw problems to full Problem documents with auto-generated links
        const problems = allRawProblems.map((p, index) => {
            const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            return {
                title: p.title,
                topic_id: p.topic_id,
                difficulty: p.difficulty,
                tags: p.tags,
                video_link: `https://www.youtube.com/results?search_query=${encodeURIComponent(p.title + ' leetcode solution')}`,
                problem_link: `https://leetcode.com/problems/${slug}/`,
                article_link: `https://takeuforward.org/${p.topic_id}/${slug}`, // Mock article link
                description: `Practice problem: ${p.title}. Analyze the time and space complexity. Solved commonly using ${p.tags.join(', ')}.`,
                order_index: index + 1
            };
        });

        await Problem.insertMany(problems);

        console.log(`Data Seeded Successfully! Inserted ${problems.length} problems.`);
        process.exit();
    } catch (error) {
        console.error('Error with data seeding', error);
        process.exit(1);
    }
};

seedData();
