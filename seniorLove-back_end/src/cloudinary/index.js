// Purpose: Configure Cloudinary with your credentials and configure Cloudinary storage for event photos and user profile pictures.

// Imports
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

// Configure Cloudinary storage for event photos
const eventPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'event_photos', // Folder for event photos
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed formats for event photos
  },
});

// Configure Cloudinary storage for user profile pictures
const userPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_photos', // Folder for user profile pictures
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed formats for user profile pictures
  },
});

// Export
export { eventPhotoStorage, userPhotoStorage };
