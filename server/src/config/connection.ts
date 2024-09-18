import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from a .env file into process.env

import { Sequelize } from 'sequelize';

// Initialize a Sequelize instance to connect to the PostgreSQL database.
// If DB_URL is provided in the environment variables, use it directly.
// Otherwise, use individual environment variables for database name, user, and password.
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',       // Database host
      dialect: 'postgres',     // Database dialect (PostgreSQL)
      dialectOptions: {
        decimalNumbers: true,  // Ensure decimal numbers are handled correctly
      },
    });

export default sequelize;
