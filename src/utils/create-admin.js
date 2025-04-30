// Simple script to create an admin user
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Admin credentials - you can change these
const adminEmail = 'admin@wecan.org';
const adminPassword = 'Admin@123';
const adminName = 'WeCan Admin';

// Connect directly to MongoDB Atlas
const uri = process.env.MONGODB_URI;
console.log('Connecting to MongoDB...');

mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to MongoDB successfully!');
    
    // Define a simple User schema
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      isVerified: Boolean
    });
    
    // Create the User model
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
          isVerified: true
        });
        
        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
    } finally {
      // Disconnect from MongoDB
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }); 