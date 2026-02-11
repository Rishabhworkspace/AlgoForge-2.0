import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
    user_id: mongoose.Types.ObjectId;
    problem_id: mongoose.Types.ObjectId; // Ref to Problem _id (not the string ID if we use default mongo _id for problems, but wait, Problem definition didn't specify custom _id, so it uses ObjectId)
    status: 'TODO' | 'SOLVED' | 'ATTEMPTED';
    is_bookmarked: boolean;
    notes: string;
}

const UserProgressSchema: Schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    problem_id: { type: Schema.Types.ObjectId, ref: 'Problem', required: true, index: true },
    status: { type: String, enum: ['TODO', 'SOLVED', 'ATTEMPTED'], default: 'TODO' },
    is_bookmarked: { type: Boolean, default: false },
    notes: { type: String, default: '' },
}, {
    timestamps: true
});

// compound index to ensure one progress entry per user per problem
UserProgressSchema.index({ user_id: 1, problem_id: 1 }, { unique: true });

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
