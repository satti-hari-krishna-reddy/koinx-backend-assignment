const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env' });
}

const MONGO_URI = process.env.MONGO_URI;
const RETRY_INTERVAL = 5000; // milliseconds

async function connectDB() {
  while (true) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('[INFO] MongoDB connected');
      break; 
    } catch (err) {
      console.log('[ERROR] MongoDB connection failed:', err.message);
      console.log(`[INFO] Retrying in ${RETRY_INTERVAL / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
}

module.exports = connectDB;
