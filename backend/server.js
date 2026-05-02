const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Volt Energy API' });
});

// Example Schema for tracking WhatsApp Clicks
const clickSchema = new mongoose.Schema({
  product: String,
  timestamp: { type: Date, default: Date.now },
  userAgent: String
});

const Click = mongoose.model('Click', clickSchema);

// Endpoint to track WhatsApp clicks
app.post('/api/track-click', async (req, res) => {
  try {
    const { product } = req.body;
    
    // Create a new click record
    const newClick = new Click({
      product,
      userAgent: req.headers['user-agent']
    });
    
    await newClick.save();
    
    res.status(200).json({ success: true, message: 'Click tracked successfully' });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.status(500).json({ success: false, error: 'Failed to track click' });
  }
});

// Endpoint to retrieve click analytics
app.get('/api/analytics', async (req, res) => {
  try {
    const clicks = await Click.find().sort({ timestamp: -1 }).limit(100);
    const vkPowerClicks = await Click.countDocuments({ product: 'VK Power' });
    const mkGoldClicks = await Click.countDocuments({ product: 'MK Gold' });
    const totalClicks = vkPowerClicks + mkGoldClicks;
    
    res.status(200).json({
      success: true,
      data: {
        totalClicks,
        vkPowerClicks,
        mkGoldClicks,
        recentClicks: clicks
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/volt-energy')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    // Still start the server even if DB fails, for demo purposes
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (Database not connected)`);
    });
  });
