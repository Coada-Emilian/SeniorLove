// Purpose: Model for the events_hobbies table.

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize_client.js';

export class Event_hobby extends Model {}

Event_hobby.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'events',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    hobby_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hobbies',
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
    modelName: 'Event_hobby',
    tableName: 'events_hobbies',
  }
);
