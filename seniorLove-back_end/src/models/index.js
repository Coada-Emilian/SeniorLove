// Purpose: Gathering and exporting all models and the sequelize instance.

import { Event_hobby } from './associative_tables/Event_hobby.js';
import { User_event } from './associative_tables/User_event.js';
import { User_hobby } from './associative_tables/User_hobby.js';
import { Admin, Event, Hobby, User, User_message } from './associations.js';
import { sequelize } from './sequelize_client.js';

export {
  Admin,
  Event,
  Hobby,
  User,
  User_message,
  Event_hobby,
  User_event,
  User_hobby,
  sequelize,
};
