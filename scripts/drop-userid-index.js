const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set in environment variables.');
  process.exit(1);
}

const alumniSchema = new mongoose.Schema({}, { collection: 'alumnis' });
const Alumni = mongoose.model('Alumni', alumniSchema);

async function dropUserIdIndex() {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  try {
    await Alumni.collection.dropIndex('userId_1');
    console.log('Dropped unique index on userId.');
  } catch (e) {
    if (e.codeName === 'IndexNotFound') {
      console.log('No userId index to drop.');
    } else {
      console.error('Error dropping userId index:', e.message);
    }
  }

  await mongoose.disconnect();
  console.log('Done.');
}

dropUserIdIndex().catch(err => {
  console.error('Error:', err);
  process.exit(1);
}); 