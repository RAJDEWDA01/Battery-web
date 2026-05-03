function createRateLimiter({
  windowMs,
  maxRequests,
  errorMessage = 'Too many requests. Please try again shortly.',
}) {
  const requestLog = new Map();

  return function rateLimiter(req, res, next) {
    const clientKey = req.ip || req.socket?.remoteAddress || 'unknown';
    const routeKey = `${req.method}:${req.path}:${clientKey}`;
    const currentTime = Date.now();
    const currentWindow = requestLog.get(routeKey);

    if (!currentWindow || currentWindow.resetAt <= currentTime) {
      requestLog.set(routeKey, {
        count: 1,
        resetAt: currentTime + windowMs,
      });

      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', maxRequests - 1);
      return next();
    }

    currentWindow.count += 1;
    requestLog.set(routeKey, currentWindow);

    const remainingRequests = Math.max(maxRequests - currentWindow.count, 0);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remainingRequests);

    if (currentWindow.count > maxRequests) {
      const retryAfterSeconds = Math.ceil((currentWindow.resetAt - currentTime) / 1000);

      res.setHeader('Retry-After', retryAfterSeconds);

      return res.status(429).json({
        success: false,
        error: errorMessage,
      });
    }

    return next();
  };
}

module.exports = {
  createRateLimiter,
};
