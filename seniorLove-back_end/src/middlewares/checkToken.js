// Purpose: Middleware that checks if a token is valid.

import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function checkToken(req, res, next) {
  // Check if the request has an authorization header
  const authorization = req.headers.authorization;
  // If there is an authorization header, extract the token
  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      jsonwebtoken.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
      //return 401
      console.error(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
  next();
}
