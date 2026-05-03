const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { CLIENT_ORIGIN, SERVE_FRONTEND } = require('./config/env');
const { isDatabaseConnected } = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const shouldServeFrontend = SERVE_FRONTEND && fs.existsSync(frontendDistPath);

function createCorsError(message) {
  const error = new Error(message);
  error.statusCode = 403;
  return error;
}

const corsOptions =
  CLIENT_ORIGIN === '*'
    ? {}
    : {
        origin(origin, callback) {
          if (!origin || CLIENT_ORIGIN.includes(origin)) {
            return callback(null, true);
          }

          return callback(createCorsError(`Origin not allowed by CORS: ${origin}`));
        },
      };

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    database: isDatabaseConnected() ? 'connected' : 'memory-fallback',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRoutes);

if (shouldServeFrontend) {
  app.use(express.static(frontendDistPath));

  app.get(/^(?!\/api|\/health).*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to the Volt Energy API',
      endpoints: ['/health', '/api/track-click', '/api/analytics'],
    });
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
