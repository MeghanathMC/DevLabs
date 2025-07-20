const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://meghanathreddymc:2314eventEyehack@cluster0.ho3x7gy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// User Schema (matching your User model)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
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
    theme: { type: String, enum: ['modern', 'professional', 'creative', 'minimal'], default: 'modern' },
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

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'meghanath@thetapacademy.com' });
    if (existingUser) {
      console.log('User already exists!');
      mongoose.connection.close();
      return;
    }
    
    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const hashedPassword = await bcrypt.hash('12345678', saltRounds);
    
    // Create user
    const testUser = new User({
      email: 'meghanath@thetapacademy.com',
      password: hashedPassword,
      profile: {
        firstName: 'Meghanath',
        lastName: 'Reddy',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
      },
      settings: {
        portfolioSlug: 'meghanath-reddy',
        isPublic: false,
        theme: 'modern',
        customization: {
          primaryColor: '#2563eb',
          secondaryColor: '#64748b',
          font: 'Inter',
          showSection: {
            about: true,
            projects: true,
            achievements: true,
            skills: true,
            contact: true
          }
        }
      },
      preferences: {
        emailNotifications: true,
        publicProfile: false,
        showEmail: false
      }
    });
    
    await testUser.save();
    console.log('✅ Test user created successfully!');
    console.log('Email: meghanath@thetapacademy.com');
    console.log('Password: 12345678');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTestUser(); 