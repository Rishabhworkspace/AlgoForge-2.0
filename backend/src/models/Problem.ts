import mongoose, { Document, Schema } from 'mongoose';

export interface IProblem extends Document {
    title: string;
    topic_id: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    video_link?: string;
    problem_link?: string;
    article_link?: string; // Should we add this? The mock data has video/problem links.
    description: string;
    tags: string[];
    order_index: number;
}

const ProblemSchema: Schema = new Schema({
    title: { type: String, required: true },
    topic_id: { type: String, required: true, ref: 'Topic', index: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    video_link: { type: String },
    problem_link: { type: String },
    description: { type: String, required: true },
    tags: [{ type: String }],
    order_index: { type: Number, required: true },
}, {
    timestamps: true
});

export default mongoose.model<IProblem>('Problem', ProblemSchema);
