import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    location?: string;
    university?: string;
    graduationYear?: number;
    skills: string[];
    socialLinks: {
      github?: string;
      linkedin?: string;
      portfolio?: string;
      twitter?: string;
    };
  };
  settings: {
    portfolioSlug: string;
    isPublic: boolean;
    theme: 'modern' | 'professional' | 'creative' | 'minimal';
    customization: {
      primaryColor: string;
      secondaryColor: string;
      font: string;
      showSection: {
        about: boolean;
        projects: boolean;
        achievements: boolean;
        skills: boolean;
        contact: boolean;
      };
    };
  };
  preferences: {
    emailNotifications: boolean;
    publicProfile: boolean;
    showEmail: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: String,
    bio: String,
    location: String,
    university: String,
    graduationYear: Number,
    skills: [{ type: String, trim: true }],
    socialLinks: {
      github: String,
      linkedin: String,
      portfolio: String,
      twitter: String
    }
  },
  settings: {
    portfolioSlug: { type: String, unique: true, sparse: true },
    isPublic: { type: Boolean, default: false },
    theme: { 
      type: String, 
      enum: ['modern', 'professional', 'creative', 'minimal'],
      default: 'modern'
    },
    customization: {
      primaryColor: { type: String, default: '#2563eb' },
      secondaryColor: { type: String, default: '#64748b' },
      font: { type: String, default: 'Inter' },
      showSection: {
        about: { type: Boolean, default: true },
        projects: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
        skills: { type: Boolean, default: true },
        contact: { type: Boolean, default: true }
      }
    }
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    publicProfile: { type: Boolean, default: false },
    showEmail: { type: Boolean, default: false }
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ 'settings.portfolioSlug': 1 });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);