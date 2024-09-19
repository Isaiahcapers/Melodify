// server.ts
import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.js';
import { usersRouter } from './routes/api/userRoutes.js';
import { sequelize } from './config/connection.js';
import { melodifyRoutes } from './routes/api/melodifyRoutes.js'; // Ensure the route file is correctly imported
dotenv.config();

console.log('Client ID:', process.env.SPOTIFY_CLIENT_ID);
console.log('Redirect URL:', process.env.SPOTIFY_REDIRECT_URL);

const app = express();
app.use(express.json());
// User routes
app.use('/api/users', usersRouter);
// Auth routes
app.use('/api/auth', authRoutes);
// Melodify routes (now added correctly)
app.use('/api/melodify', melodifyRoutes); // Ensure melodify routes are used
// Database sync and server start
const PORT = process.env.PORT || 4000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
