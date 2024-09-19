import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.js';
import { usersRouter } from './routes/api/userRoutes.js';
import { sequelize } from './config/connection.js';
import { melodifyRoutes } from './routes/api/melodifyRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// User routes
app.use('/api/users', usersRouter);

// Auth routes
app.use('/api/auth', authRoutes);

// Melodify routes (now added correctly)
app.use('/api/melodify', melodifyRoutes);

// Error Handling Middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);  // Logs the error
  res.status(500).json({ message: 'Internal Server Error' });
});

// Database sync and server start
const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
