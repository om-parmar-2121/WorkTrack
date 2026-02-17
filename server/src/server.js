import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';

const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();