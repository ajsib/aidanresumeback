// Import the dotenv library to load environment variables from .env file
const dotenv = require('dotenv');

// Load environment variables from .env file into the process.env object
dotenv.config();

// Export an object containing environment variables for use in other parts of the application
module.exports = {
  // Export the value of the 'MONGODB_URI' environment variable, which holds the MongoDB connection string
  MONGODB_URI: process.env.MONGODB_URI,

  // Export the value of the 'JWT_SECRET' environment variable, which is used for signing and verifying JSON Web Tokens (JWT)
  JWT_SECRET: process.env.JWT_SECRET, 
};
