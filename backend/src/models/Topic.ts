import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
    id: string; // unique slug 'arrays-strings'
    path_id: string; // e.g. 'dsa'
    title: string;
    description: string;
    order_index: number;
    icon: string;
    color: string;
}

const TopicSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    path_id: { type: String, required: true, ref: 'LearningPath', index: true }, // Although we use string ID, we can still index it
    title: { type: String, required: true },
    description: { type: String, required: true },
    order_index: { type: Number, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model<ITopic>('Topic', TopicSchema);
