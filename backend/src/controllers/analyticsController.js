const {
  ANALYTICS_DEFAULT_DAYS,
  ANALYTICS_MAX_DAYS,
  RECENT_CLICK_DEFAULT_LIMIT,
  RECENT_CLICK_MAX_LIMIT,
} = require('../config/env');
const { createClickEntry, getAnalyticsSnapshot, normalizeLabel } = require('../data/clickStore');

function getClientIpAddress(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || '';
}

function parseNumber(value, fallback, max) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.min(parsed, max);
}

async function trackClick(req, res, next) {
  try {
    const label = normalizeLabel(req.body.label ?? req.body.product);

    if (!label) {
      return res.status(400).json({
        success: false,
        error: 'A click label or product name is required.',
      });
    }

    const click = await createClickEntry({
      label,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || req.headers.referrer,
      ipAddress: getClientIpAddress(req),
    });

    return res.status(201).json({
      success: true,
      message: 'Click tracked successfully',
      data: click,
    });
  } catch (error) {
    return next(error);
  }
}

async function getAnalytics(req, res, next) {
  try {
    const days = parseNumber(req.query.days, ANALYTICS_DEFAULT_DAYS, ANALYTICS_MAX_DAYS);
    const limit = parseNumber(
      req.query.limit,
      RECENT_CLICK_DEFAULT_LIMIT,
      RECENT_CLICK_MAX_LIMIT,
    );

    const analytics = await getAnalyticsSnapshot({ days, limit });

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  trackClick,
  getAnalytics,
};
