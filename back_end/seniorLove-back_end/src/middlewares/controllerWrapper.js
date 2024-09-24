// Purpose: Middleware that wraps controllers to catch errors.

export function controllerWrapper(mdw) {
  return async (req, res, next) => {
    try {
      await mdw(req, res, next);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'A server error occurred. Please try again later.' });
    }
  };
}
