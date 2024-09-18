import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/api/authRoutes'; // Import auth routes
import sequelize from './config/database';
import dotenv from 'dotenv';

//import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

// User routes
app.use('/api/users', userRoutes);

// Auth routes
app.use('/api/auth', authRoutes); // Added auth routes

// Database sync and server start
const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
