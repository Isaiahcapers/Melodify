import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// Create the Sequelize connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true, // Enforce SSL connection
          rejectUnauthorized: false, // You may want to adjust this depending on your SSL setup
        },
      },
    })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
      host: process.env.DB_HOST || 'localhost', // Ensures DB_HOST fallback is used
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true, // Support for handling decimal numbers
      },
    });

// Optionally, add error handling for database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize };
