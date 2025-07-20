import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'certificate' | 'award' | 'participation' | 'recognition' | 'scholarship';
  title: string;
  description?: string;
  issuer: string;
  date: Date;
  expiryDate?: Date;
  certificateUrl?: string;
  verificationUrl?: string;
  badgeUrl?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  featured: boolean;
  skills: string[];
  projectId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['certificate', 'award', 'participation', 'recognition', 'scholarship'],
    required: true
  },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  issuer: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  expiryDate: Date,
  certificateUrl: String,
  verificationUrl: String,
  badgeUrl: String,
  category: { type: String, required: true, trim: true },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true
  },
  featured: { type: Boolean, default: false },
  skills: [{ type: String, trim: true }],
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
}, {
  timestamps: true
});

// Indexes
AchievementSchema.index({ userId: 1 });
AchievementSchema.index({ type: 1 });
AchievementSchema.index({ category: 1 });
AchievementSchema.index({ featured: 1 });
AchievementSchema.index({ date: -1 });

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);