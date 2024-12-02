import 'dotenv/config'; // Load environment variables from .env file
import express from 'express'; // Import Express framework
import path from 'path'; // Import path module for handling file and directory paths
import { fileURLToPath } from 'url'; // Import URL utilities
import cors from 'cors'; // Import CORS middleware for handling cross-origin requests
import session from 'express-session'; // Import session middleware for managing user sessions

// Import routers and middleware
import { publicRouter } from './src/routers/publicRouter.js';
import { privateRouter } from './src/routers/privateRouter.js';
import { adminRouter } from './src/routers/adminRouter.js';
import { bodySanitizerMiddleware } from './src/middlewares/bodySanitizer.js';
import { checkLoggedIn } from './src/middlewares/checkLoggedIn.js';
import { checkToken } from './src/middlewares/checkToken.js';

// Convert import.meta.url to __filename and __dirname for file path handling
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express application
const app = express();

// Set Content Security Policy (CSP) header
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' https://img.freepik.com https://res.cloudinary.com https://images.pexels.com data:; object-src 'none';"
  );
  next();
});

// CORS options configuration
const corsOptions = {
  origin: process.env.ALLOWED_DOMAINS, // Set allowed origins from environment variable
  optionsSuccessStatus: 200, // For legacy browser support
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(
  session({
    resave: false, // Prevent resaving session if unmodified
    saveUninitialized: false, // Prevent creation of uninitialized sessions
    secret: 'Guess it!', // Secret key for signing the session ID cookie
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60, // Session expiration time (1 hour)
    },
  })
);

// Apply body sanitizer middleware to sanitize incoming request bodies
app.use(bodySanitizerMiddleware);

// Disable 'x-powered-by' header for security reasons
app.disable('x-powered-by');

// Middleware to check for valid tokens in requests
app.use(checkToken);

// Define routes for public and private API access
app.use('/api/public', publicRouter); // Public routes
app.use('/api/private', checkLoggedIn, privateRouter); // Private routes, requiring login

// Setup view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Specify the directory for views

// Serve static files from the specified directory
app.use(express.static(path.join(__dirname, 'src/assets')));

// Define routes for admin functionalities
app.use('/admin', adminRouter);

// Start the server on the specified port
const port = process.env.PORT; // Get port from environment variable

app.listen(port, () => {
  console.log(`❤️  SeniorLove server started ❤️`); // Log a message indicating the server has started
  console.log('Environment ==> ', process.env.NODE_ENV); // Log the current environment (development/production)
});
