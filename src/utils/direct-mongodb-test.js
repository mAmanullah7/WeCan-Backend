// Test MongoDB connection using the official MongoDB driver
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Try a direct connection string
const uri = "mongodb+srv://developerwecannita:developerwecannita@25@cluster0.2wnqs.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000
});

async function run() {
  try {
    // Connect the client to the server
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    
    // Confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
    
    // List available databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (err) {
    console.error("❌ Connection error:", err);
    
    // Try an alternative connection string with encoded password
    console.log("\nTrying alternative connection string...");
    const altUri = "mongodb+srv://developerwecannita:developerwecannita%4025@cluster0.2wnqs.mongodb.net/?retryWrites=true&w=majority";
    const altClient = new MongoClient(altUri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });
    
    try {
      await altClient.connect();
      await altClient.db("admin").command({ ping: 1 });
      console.log("✅ Successfully connected with alternative connection string!");
      
      // Update .env.local file with the working connection string
      const fs = require('fs');
      const envPath = path.resolve(process.cwd(), '.env.local');
      const envContent = fs.readFileSync(envPath, 'utf8');
      const updatedContent = envContent.replace(
        /MONGODB_URI=.*/,
        `MONGODB_URI=${altUri}`
      );
      fs.writeFileSync(envPath, updatedContent);
      console.log('Updated .env.local with the working connection string!');
      
      await altClient.close();
    } catch (altErr) {
      console.error("❌ Alternative connection also failed:", altErr);
      console.log("\nPlease check your MongoDB Atlas credentials and make sure your IP is whitelisted.");
    }
  } finally {
    // Close the client
    await client.close();
  }
}

run().catch(console.dir); 