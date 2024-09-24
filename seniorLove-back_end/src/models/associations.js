// Purpose: Declaring associations between models

import { Admin } from './standalone_models/Admin.js';
import { User } from './standalone_models/User.js';
import { Hobby } from './standalone_models/Hobby.js';
import { Event } from './standalone_models/Event.js';
import { User_message } from './standalone_models/User_message.js';

// Declaring users - hobbies associations

User.belongsToMany(Hobby, {
  through: 'users_hobbies',
  foreignKey: 'user_id',
  as: 'hobbies',
});

Hobby.belongsToMany(User, {
  through: 'users_hobbies',
  foreignKey: 'hobby_id',
  as: 'users',
});

// Declaring users - events associations

User.belongsToMany(Event, {
  through: 'users_events',
  foreignKey: 'user_id',
  as: 'events',
});

Event.belongsToMany(User, {
  through: 'users_events',
  foreignKey: 'event_id',
  as: 'users',
});

// Declaring events - hobbies associations

Event.belongsToMany(Hobby, {
  through: 'events_hobbies',
  foreignKey: 'event_id',
  as: 'hobbies',
});

Hobby.belongsToMany(Event, {
  through: 'events_hobbies',
  foreignKey: 'hobby_id',
  as: 'events',
});

// Declaring users - messages associations

User.hasMany(User_message, {
  foreignKey: 'sender_id',
  as: 'sent_messages',
});

User.hasMany(User_message, {
  foreignKey: 'receiver_id',
  as: 'received_messages',
});

User_message.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender',
});

User_message.belongsTo(User, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

// Declaring admin - event associations

Admin.hasMany(Event, {
  foreignKey: 'admin_id',
  as: 'events',
});

Event.belongsTo(Admin, {
  foreignKey: 'admin_id',
  as: 'admin',
});

export { User, Admin, Event, User_message, Hobby };
