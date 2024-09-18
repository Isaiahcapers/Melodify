import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// TODO: Create sequelize connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, { ssl: true })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

export default sequelize;