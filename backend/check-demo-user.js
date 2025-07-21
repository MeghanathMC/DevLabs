const mongoose = require('mongoose');
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

const User = mongoose.model('User', userSchema);

async function checkDemoUser() {
  try {
    console.log('🔍 Checking Demo User on Production Backend...');
    console.log('=============================================');
    
    // Check if demo user exists
    const demoUser = await User.findOne({ email: 'demo@example.com' });
    
    if (demoUser) {
      console.log('✅ Demo user found!');
      console.log('📧 Email:', demoUser.email);
      console.log('👤 Name:', demoUser.profile.firstName, demoUser.profile.lastName);
      console.log('🌐 Portfolio Slug:', demoUser.settings.portfolioSlug);
      console.log('📅 Created:', demoUser.createdAt);
      console.log('🔄 Last Login:', demoUser.lastLogin || 'Never');
    } else {
      console.log('❌ Demo user NOT found!');
      console.log('💡 Run "npm run create-demo" to create the demo user');
    }
    
    // Check total users
    const totalUsers = await User.countDocuments();
    console.log('📊 Total users in database:', totalUsers);
    
  } catch (error) {
    console.error('❌ Error checking demo user:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
checkDemoUser(); 