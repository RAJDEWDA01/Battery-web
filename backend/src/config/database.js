const mongoose = require('mongoose');

let listenersRegistered = false;

function registerListeners() {
  if (listenersRegistered) {
    return;
  }

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Using in-memory fallback store.');
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
  });

  listenersRegistered = true;
}

async function connectDatabase() {
  registerListeners();

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/volt-energy';

  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.warn('MongoDB unavailable at startup. API will use in-memory fallback.');
    console.warn(error.message);
  }
}

async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  isDatabaseConnected,
};
