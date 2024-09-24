// Purpose: Middleware that sanitizes the body of the request.

import sanitize from 'sanitize-html';

// Middleware that sanitizes the body of the request.
export const bodySanitizerMiddleware = (req, res, next) => {
  // Sanitize all string properties of the body
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitize(req.body[key]);
    }
  });
  next();
};
