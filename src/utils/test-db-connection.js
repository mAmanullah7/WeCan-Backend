// Simple script to test MongoDB connection
const mongoose = require('mongoose');
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

// Check if MongoDB URI is defined
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Log the connection string (but hide password)
const connectionString = process.env.MONGODB_URI;
const maskedConnectionString = connectionString.replace(
  /(mongodb\+srv:\/\/[^:]+:)([^@]+)(@.+)/,
  '$1*****$3'
);
console.log('Attempting to connect with:', maskedConnectionString);

// Connect to MongoDB with explicit options
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB. Error details:');
    console.error(err);
    
    // Provide specific guidance based on error type
    if (err.name === 'MongoParseError') {
      console.log('\nThere seems to be an issue with your MongoDB connection string format.');
      console.log('Please check your MONGODB_URI in .env.local file.');
    } else if (err.name === 'MongoServerSelectionError') {
      console.log('\nCould not connect to any MongoDB server.');
      console.log('Please check if:');
      console.log('1. Your MongoDB Atlas cluster is running');
      console.log('2. Your IP address is whitelisted in MongoDB Atlas');
      console.log('3. Your network allows connections to MongoDB Atlas');
    } else if (err.message && err.message.includes('Authentication failed')) {
      console.log('\nAuthentication failed. Please check your username and password.');
    }
    
    process.exit(1);
  }); 