// Purpose: Middleware that checks if a user is logged in.

import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function checkLoggedIn(req, res, next) {
  // Check if the request has an authorization header
  const authorization = req.headers.authorization;
  // If there is no authorization header, return 401
  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Access denied. No authentication token provided.' });
  }

  // Extract the token from the authorization header
  const token = authorization.split(' ')[1];
  try {
    // Verify the token
    const jwtContent = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
    // Set the user in the request object
    req.user = jwtContent;
  } catch (err) {
    // Return 401 if the token is invalid
    console.error(err);
    return res.status(401).json({
      message:
        'Unauthorized access. Authentication token is missing or invalid.',
    });
  }
  next();
}
