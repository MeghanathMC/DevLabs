const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://meghanathreddymc:2314eventEyehack@cluster0.ho3x7gy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// User Schema (simplified for testing)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  settings: {
    portfolioSlug: { type: String, unique: true }
  }
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

async function testLogin() {
  try {
    console.log('Testing login functionality...');
    
    // Check if test user exists
    let testUser = await User.findOne({ email: 'demo@example.com' });
    
    if (!testUser) {
      console.log('Creating test user...');
      const hashedPassword = await bcrypt.hash('password', 12);
      
      testUser = new User({
        email: 'demo@example.com',
        password: hashedPassword,
        profile: {
          firstName: 'Demo',
          lastName: 'User'
        },
        settings: {
          portfolioSlug: 'demo-user'
        }
      });
      
      await testUser.save();
      console.log('Test user created successfully');
    } else {
      console.log('Test user already exists');
    }
    
    // Test password comparison
    const isValid = await testUser.comparePassword('password');
    console.log('Password validation test:', isValid ? 'PASSED' : 'FAILED');
    
    // Test with wrong password
    const isInvalid = await testUser.comparePassword('wrongpassword');
    console.log('Wrong password test:', !isInvalid ? 'PASSED' : 'FAILED');
    
    console.log('Login functionality test completed');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

testLogin(); 