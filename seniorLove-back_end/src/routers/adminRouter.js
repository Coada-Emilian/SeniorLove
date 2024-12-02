// Purpose: Router for admin routes.

import { Router } from 'express';
import multer from 'multer';
import { eventPhotoStorage } from '../cloudinary/index.js';
import { controllerWrapper as cw } from '../middlewares/controllerWrapper.js';
import adminController from '../controllers/adminController.js';

// Multer middleware for uploading event photos.
const uploadEventPhoto = multer({ storage: eventPhotoStorage });

// Admin router.
export const adminRouter = Router();

// Admin login routes
adminRouter.get('/', cw(adminController.index));

adminRouter.post('/login', cw(adminController.login));

adminRouter.get('/logout', cw(adminController.logout));

// Admin user routes
adminRouter.get('/users', cw(adminController.renderAllUsers));

adminRouter.get('/users/pending', cw(adminController.renderPendingUsers));

adminRouter.get('/users/banished', cw(adminController.renderBanishedUsers));

adminRouter.get('/users/:id', cw(adminController.renderUser));

adminRouter.patch('/users/:id/status', cw(adminController.updateUserStatus));

adminRouter.delete('/users/:id/delete', cw(adminController.deleteUser));

// Admin events routes
adminRouter.get('/events', cw(adminController.renderEvents));

adminRouter.get('/events/create', cw(adminController.renderCreateEvent));

adminRouter.post(
  '/events/create',
  uploadEventPhoto.single('photo'),
  cw(adminController.createEvent)
);

adminRouter.delete('/events/:id/delete', cw(adminController.deleteEvent));

adminRouter.get('/events/:id', cw(adminController.renderUpdateEvent));

adminRouter.patch(
  '/events/:id/update',
  uploadEventPhoto.single('picture'),
  cw(adminController.updateEvent)
);

// If no route matches, render 404 error page.
adminRouter.get('*', cw(adminController.render404Error));
