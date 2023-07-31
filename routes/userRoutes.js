// userRoutes.js
const express = require('express'); // Express.js web framework
const router = express.Router(); // Create a new router instance to handle routes
const userController = require('../controllers/userController'); // Import user controller functions
const authentication = require('../middlewares/authentication'); // Import authentication middleware

// Define routes and their corresponding controller functions

// Route for user registration (HTTP POST request to '/register')
router.post('/register', userController.register);

// Route for user login (HTTP POST request to '/login')
router.post('/login', userController.login);

// Route for user logout (HTTP POST request to '/logout')
router.post('/logout', userController.logout);

// Route to get user information (HTTP GET request to '/user')
// The 'authentication' middleware is applied before executing the 'getUser' function
router.get('/user', authentication, userController.getUser);

// Export the router to make it available for use in other parts of the application
module.exports = router;
