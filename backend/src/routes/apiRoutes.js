const express = require('express');

const {
  TRACK_CLICK_RATE_LIMIT_MAX_REQUESTS,
  TRACK_CLICK_RATE_LIMIT_WINDOW_MS,
} = require('../config/env');
const { isDatabaseConnected } = require('../config/database');
const { getAnalytics, trackClick } = require('../controllers/analyticsController');
const { requireAnalyticsApiKey } = require('../middleware/requireAnalyticsApiKey');
const { createRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
const trackClickRateLimiter = createRateLimiter({
  windowMs: TRACK_CLICK_RATE_LIMIT_WINDOW_MS,
  maxRequests: TRACK_CLICK_RATE_LIMIT_MAX_REQUESTS,
  errorMessage: 'Too many click tracking requests from this device. Please wait a moment.',
});

router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    database: isDatabaseConnected() ? 'connected' : 'memory-fallback',
    timestamp: new Date().toISOString(),
  });
});

router.post('/track-click', trackClickRateLimiter, trackClick);
router.get('/analytics', requireAnalyticsApiKey, getAnalytics);

module.exports = router;
