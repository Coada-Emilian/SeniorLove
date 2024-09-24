// Purpose: Router for public routes

import { Router } from 'express';
import multer from 'multer';

import { userPhotoStorage } from '../cloudinary/index.js';
import hobbyController from '../controllers/hobbyController.js';
import { controllerWrapper as cw } from '../middlewares/controllerWrapper.js';
import eventController from '../controllers/eventController.js';
import authController from '../controllers/authController.js';

// Multer configuration for user photo upload
const uploadUserPhoto = multer({ storage: userPhotoStorage });

export const publicRouter = Router();

// Event routes
publicRouter.get('/events', cw(eventController.getAllEvents));
publicRouter.get('/events/:eventId', cw(eventController.getOneEvent));

// Authentification routes
publicRouter.post(
  '/register',
  uploadUserPhoto.single('picture'),
  cw(authController.addUser)
);
publicRouter.post('/login', cw(authController.loginUser));

// Hobby routes
publicRouter.get('/hobbies', cw(hobbyController.getAllHobbies));
