// Remove this line if you're not using 'authRoutes' in this file
// import { authRoutes } from '../routes/api/authRoutes'; // Remove this if unused

import { sequelize } from '../config/connection.js';
import { User } from './user.js';

// Initialize models or do other necessary setups here

// Sync the models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

export { sequelize, User }; // Export what is necessary
