// Purpose: Model for the users_events table.

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class User_event extends Model {}

User_event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'events',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'User_event',
    tableName: 'users_events',
  }
);
