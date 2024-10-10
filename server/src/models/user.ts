// models/user.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection.js';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // This ensures the table will be named 'users'
    timestamps: true,
  }
);

export { User };
