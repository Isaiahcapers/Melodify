import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.js';
import { usersRouter } from './routes/api/userRoutes.js';
import { sequelize } from './config/connection.js';
//import { Sequelize } from './config/connection.js';
//import sequelize from './config/connection.js';

//import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

// User routes
app.use('/api/users', usersRouter);

// Auth routes
app.use('/api/auth', authRoutes); // Added auth routes
// Database sync and server start
const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
