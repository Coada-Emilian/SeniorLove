// Purpose: Check if a user is active.

import { User } from '../models/associations.js';

export async function isActiveUser(userId) {
  const me = await User.findByPk(userId);
  if (!me || me.status === 'banned' || me.status === 'pending') {
    return false;
  }
  return true;
}
