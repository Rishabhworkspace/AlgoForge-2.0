import mongoose, { Document, Schema } from 'mongoose';

export interface ILearningPath extends Document {
  id: string; // unique slug like 'dsa'
  title: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
}

const LearningPathSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  order_index: { type: Number, required: true },
}, {
  timestamps: true
});

export default mongoose.model<ILearningPath>('LearningPath', LearningPathSchema);
