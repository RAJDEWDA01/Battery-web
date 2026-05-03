function parsePort(value, fallback) {
  const port = Number.parseInt(value, 10);

  if (Number.isNaN(port) || port <= 0) {
    return fallback;
  }

  return port;
}

function parseInteger(value, fallback) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
}

function parseBoolean(value, fallback = false) {
  if (typeof value !== 'string') {
    return fallback;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue === 'true') {
    return true;
  }

  if (normalizedValue === 'false') {
    return false;
  }

  return fallback;
}

const PORT = parsePort(process.env.PORT, 5000);
const rawClientOrigin = process.env.CLIENT_ORIGIN || '*';
const CLIENT_ORIGIN =
  rawClientOrigin.trim() === '*'
    ? '*'
    : rawClientOrigin
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
const ANALYTICS_DEFAULT_DAYS = 30;
const ANALYTICS_MAX_DAYS = 365;
const RECENT_CLICK_DEFAULT_LIMIT = 25;
const RECENT_CLICK_MAX_LIMIT = 100;
const ANALYTICS_API_KEY = (process.env.ANALYTICS_API_KEY || '').trim();
const TRACK_CLICK_RATE_LIMIT_WINDOW_MS = parseInteger(
  process.env.TRACK_CLICK_RATE_LIMIT_WINDOW_MS,
  60000,
);
const TRACK_CLICK_RATE_LIMIT_MAX_REQUESTS = parseInteger(
  process.env.TRACK_CLICK_RATE_LIMIT_MAX_REQUESTS,
  60,
);
const SERVE_FRONTEND = parseBoolean(
  process.env.SERVE_FRONTEND,
  process.env.NODE_ENV === 'production',
);

module.exports = {
  PORT,
  CLIENT_ORIGIN,
  ANALYTICS_DEFAULT_DAYS,
  ANALYTICS_MAX_DAYS,
  RECENT_CLICK_DEFAULT_LIMIT,
  RECENT_CLICK_MAX_LIMIT,
  ANALYTICS_API_KEY,
  TRACK_CLICK_RATE_LIMIT_WINDOW_MS,
  TRACK_CLICK_RATE_LIMIT_MAX_REQUESTS,
  SERVE_FRONTEND,
};
