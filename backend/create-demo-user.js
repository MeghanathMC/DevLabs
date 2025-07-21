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

async function createDemoUser() {
  try {
    console.log('🎯 Creating Demo User for DevLabs...');
    console.log('=====================================');
    
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@example.com' });
    if (existingUser) {
      console.log('✅ Demo user already exists!');
      console.log('📧 Email: demo@example.com');
      console.log('🔑 Password: password');
      console.log('🌐 Portfolio URL: /portfolio/demo-user');
      mongoose.connection.close();
      return;
    }
    
    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const hashedPassword = await bcrypt.hash('password', saltRounds);
    
    // Create demo user with comprehensive profile
    const demoUser = new User({
      email: 'demo@example.com',
      password: hashedPassword,
      profile: {
        firstName: 'Demo',
        lastName: 'User',
        bio: 'This is a demo account for testing the DevLabs platform. Feel free to explore all the features and see how the portfolio system works!',
        location: 'Demo City, DC',
        university: 'Demo University',
        graduationYear: 2024,
        skills: [
          'JavaScript', 'React', 'Node.js', 'MongoDB', 
          'TypeScript', 'Tailwind CSS', 'Express.js', 
          'Git', 'REST APIs', 'JWT Authentication'
        ],
        socialLinks: {
          github: 'https://github.com/demo-user',
          linkedin: 'https://linkedin.com/in/demo-user',
          portfolio: 'https://demo-user.dev',
          twitter: 'https://twitter.com/demo-user'
        }
      },
      settings: {
        portfolioSlug: 'demo-user',
        isPublic: true,
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
        publicProfile: true,
        showEmail: false
      }
    });
    
    await demoUser.save();
    
    console.log('🎉 Demo user created successfully!');
    console.log('=====================================');
    console.log('📧 Email: demo@example.com');
    console.log('🔑 Password: password');
    console.log('🌐 Portfolio URL: /portfolio/demo-user');
    console.log('📱 You can now use these credentials to login!');
    console.log('=====================================');
    
  } catch (error) {
    console.error('❌ Error creating demo user:', error);
    console.error('Error details:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
createDemoUser(); 