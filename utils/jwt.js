// Import necessary modules and libraries
const jwt = require('jsonwebtoken'); // Library for JSON Web Tokens (JWT)

// Import the JWT_SECRET from the environment configuration file
// Note: The ../config/env file is assumed to contain a JWT_SECRET constant
// with the secret key for signing and verifying JWTs.
const { JWT_SECRET } = require('../config/env');

// Function to sign (create) a new JWT token with a given payload
exports.signToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

// Function to verify the authenticity of a JWT token and decode its payload
exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
