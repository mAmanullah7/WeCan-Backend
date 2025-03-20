// Script to test multiple MongoDB connection string formats
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// The password appears to be "developerwecannita@25"
// Let's try different encodings of this password
const username = 'developerwecannita';
const password = 'developerwecannita@25';
const cluster = 'cluster0.2wnqs.mongodb.net';
const dbName = 'wecan';

// Different ways to encode the password
const encodings = [
  // Original password (with @ character)
  password,
  
  // URL encoded @ symbol
  password.replace('@', '%40'),
  
  // Double URL encoded @ symbol
  password.replace('@', '%2540'),
  
  // Fully URL encoded password
  encodeURIComponent(password),
  
  // Try without special characters
  'developerwecannita25'
];

// Test each connection string
async function testConnections() {
  console.log('Testing multiple MongoDB connection string formats...\n');
  
  for (let i = 0; i < encodings.length; i++) {
    const encodedPassword = encodings[i];
    const connectionString = `mongodb+srv://${username}:${encodedPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`;
    
    console.log(`\nTesting connection string #${i+1}:`);
    console.log(`Password used: ${encodedPassword}`);
    
    try {
      // Set a short timeout to quickly test each connection
      const connection = await mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000
      });
      
      console.log('✅ CONNECTION SUCCESSFUL!');
      console.log('This is the correct connection string format:');
      console.log(`mongodb+srv://${username}:${encodedPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`);
      
      // Update .env.local file with the working connection string
      const envPath = path.resolve(process.cwd(), '.env.local');
      const envContent = fs.readFileSync(envPath, 'utf8');
      const updatedContent = envContent.replace(
        /MONGODB_URI=.*/,
        `MONGODB_URI=mongodb+srv://${username}:${encodedPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`
      );
      fs.writeFileSync(envPath, updatedContent);
      console.log('\nUpdated .env.local with the working connection string!');
      
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.log(`❌ Connection failed: ${err.message}`);
      await mongoose.disconnect().catch(() => {});
    }
  }
  
  console.log('\n❌ All connection attempts failed.');
  console.log('Please check your MongoDB Atlas credentials and make sure your IP is whitelisted.');
  process.exit(1);
}

testConnections(); 