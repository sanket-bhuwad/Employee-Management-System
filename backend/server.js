const app = require('./app');
const env = require('./config/env');
const { testConnection } = require('./config/db');

const PORT = env.port;

const startServer = async () => {
  try {
    await testConnection();
    console.log('MySQL connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
