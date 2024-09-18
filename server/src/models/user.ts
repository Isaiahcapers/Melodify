// models/user.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection'; // Centralized Sequelize connection

// Define the User model
class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the centralized sequelize instance
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export { User };
