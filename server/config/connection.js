import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
// TODO: Create sequelize connection
// const sequelize = '';
const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', // You can change this to the database dialect you're using (e.g., 'mysql', 'sqlite', 'mariadb')
    logging: false, // Disable logging for production, or you can enable it for debugging
});
export default sequelize;
