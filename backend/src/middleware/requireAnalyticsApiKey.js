const { ANALYTICS_API_KEY } = require('../config/env');

function extractApiKey(req) {
  const headerKey = req.headers['x-api-key'];

  if (typeof headerKey === 'string' && headerKey.trim()) {
    return headerKey.trim();
  }

  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader === 'string') {
    const bearerMatch = authorizationHeader.match(/^Bearer\s+(.+)$/i);

    if (bearerMatch) {
      return bearerMatch[1].trim();
    }
  }

  return '';
}

function requireAnalyticsApiKey(req, res, next) {
  if (!ANALYTICS_API_KEY) {
    return next();
  }

  const providedApiKey = extractApiKey(req);

  if (providedApiKey !== ANALYTICS_API_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized analytics access.',
    });
  }

  return next();
}

module.exports = {
  requireAnalyticsApiKey,
};
