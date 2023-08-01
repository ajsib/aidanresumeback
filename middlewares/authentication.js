// ./middlewares/authentication.js
const jwt = require('../utils/jwt');

module.exports = function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token and decode its payload
    const decodedToken = jwt.verifyToken(token.replace('Bearer ', ''));

    // Attach the user's ID from the token payload to the request object for later use
    req.user = decodedToken;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
