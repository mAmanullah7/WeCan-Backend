// This script creates an admin user in the database
// Run with: node src/utils/seed-admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('Loaded environment variables from .env.local');
} else {
  dotenv.config();
  console.log('No .env.local found, using default environment variables');
}

// Admin credentials - you can change these
const adminEmail = 'admin@wecan.org';
const adminPassword = 'Admin@123';
const adminName = 'WeCan Admin';

// Check if MongoDB URI is defined
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
console.log(`Connection string starts with: ${process.env.MONGODB_URI.substring(0, 20)}...`);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    
    // Define User schema
    const userSchema = new mongoose.Schema({
      name: String,
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: String,
      role: {
        type: String,
        enum: ['user', 'admin', 'alumni'],
        default: 'user'
      },
      isVerified: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    });
    
    // Create User model
    const User = mongoose.models.User || mongoose.model('User', userSchema);
    
    try {
      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: adminEmail });
      
      if (existingAdmin) {
        console.log('Admin user already exists with email:', adminEmail);
      } else {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        
        // Create admin user
        const admin = new User({
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        await admin.save();
        console.log('Admin user created successfully');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB. Error details:');
    console.error(err);
    
    if (err.name === 'MongoParseError') {
      console.log('\nThere seems to be an issue with your MongoDB connection string.');
      console.log('Please check your MONGODB_URI in .env.local file.');
    } else if (err.name === 'MongoNetworkError') {
      console.log('\nCould not connect to the MongoDB server.');
      console.log('Please check if:');
      console.log('1. Your MongoDB Atlas cluster is running');
      console.log('2. Your IP address is whitelisted in MongoDB Atlas');
      console.log('3. Your username and password are correct');
    }
    
    process.exit(1);
  }); 