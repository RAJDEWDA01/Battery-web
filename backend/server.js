require('dotenv').config();
const app = require('./src/app');
const { PORT } = require('./src/config/env');
const { connectDatabase, disconnectDatabase } = require('./src/config/database');

async function startServer() {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => {
    shutdown('SIGINT').catch((error) => {
      console.error('Error during shutdown:', error);
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    shutdown('SIGTERM').catch((error) => {
      console.error('Error during shutdown:', error);
      process.exit(1);
    });
  });
}

startServer().catch((error) => {
  console.error('Unable to start the server:', error);
  process.exit(1);
});
