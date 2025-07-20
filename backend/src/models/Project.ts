import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'blockchain' | 'iot' | 'game' | 'other';
  status: 'completed' | 'ongoing' | 'abandoned';
  images: string[];
  videos?: string[];
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
    youtube?: string;
    slides?: string;
  };
  hackathon?: {
    name: string;
    date: Date;
    location: string;
    duration: string;
    organizer: string;
    website?: string;
  };
  team: Array<{
    name: string;
    role: string;
    github?: string;
    linkedin?: string;
  }>;
  achievements: string[];
  tags: string[];
  featured: boolean;
  metrics: {
    views: number;
    likes: number;
    githubStars?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  shortDescription: { type: String, required: true, maxlength: 200 },
  description: { type: String, required: true },
  technologies: [{ type: String, trim: true }],
  category: {
    type: String,
    enum: ['web', 'mobile', 'ai', 'blockchain', 'iot', 'game', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'abandoned'],
    default: 'completed'
  },
  images: [String],
  videos: [String],
  links: {
    github: String,
    demo: String,
    devpost: String,
    youtube: String,
    slides: String
  },
  hackathon: {
    name: String,
    date: Date,
    location: String,
    duration: String,
    organizer: String,
    website: String
  },
  team: [{
    name: { type: String, required: true },
    role: { type: String, required: true },
    github: String,
    linkedin: String
  }],
  achievements: [String],
  tags: [String],
  featured: { type: Boolean, default: false },
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    githubStars: Number
  }
}, {
  timestamps: true
});

// Indexes
ProjectSchema.index({ userId: 1 });
ProjectSchema.index({ technologies: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ 'hackathon.date': -1 });

export default mongoose.model<IProject>('Project', ProjectSchema);