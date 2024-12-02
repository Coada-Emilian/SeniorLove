// Purpose: Router for private routes

import { Router } from 'express';
import multer from 'multer';
import userController from '../controllers/userController.js';
import messageController from '../controllers/messageController.js';
import { controllerWrapper as cw } from '../middlewares/controllerWrapper.js';
import { checkLoggedIn } from '../middlewares/checkLoggedIn.js';
import { userPhotoStorage } from '../cloudinary/index.js';

// Multer configuration for user photo upload
const uploadUserPhoto = multer({ storage: userPhotoStorage });

export const privateRouter = Router();

// User routes
privateRouter.get('/users/me', cw(userController.getConnectedUser));

privateRouter.get('/users', checkLoggedIn, cw(userController.getAllUsers));

privateRouter.patch(
  '/users/me',
  checkLoggedIn,
  cw(userController.updateUserProfile)
);

privateRouter.post(
  '/users/:userId/uploadPhoto',
  uploadUserPhoto.single('new-image'),
  userController.uploadUserImage
);

privateRouter.get(
  '/users/me/suggestions',
  checkLoggedIn,
  cw(userController.getAllSameInterestUsers)
);

privateRouter.get(
  '/users/:userId',
  checkLoggedIn,
  cw(userController.getOneUser)
);

privateRouter.delete(
  '/users/me/delete',
  checkLoggedIn,
  cw(userController.deleteUser)
);

// Events routes
privateRouter.put(
  '/events/:eventId/register',
  checkLoggedIn,
  cw(userController.addUserToEvent)
);

privateRouter.delete(
  '/events/:eventId/unregister',
  checkLoggedIn,
  cw(userController.removeUserFromEvent)
);

// Messages routes
privateRouter.get(
  '/contacts',
  checkLoggedIn,
  cw(messageController.getAllUserContacts)
);

privateRouter.get(
  '/messages',
  checkLoggedIn,
  cw(messageController.getAllUserMessages)
);

privateRouter.post(
  '/messages',
  checkLoggedIn,
  cw(messageController.sendMessageToUser)
);
