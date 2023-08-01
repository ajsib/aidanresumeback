// userRoutes.js
const express = require('express'); // Express.js web framework
const router = express.Router(); // Create a new router instance to handle routes
const userController = require('../controllers/userController'); // Import user controller functions
const authentication = require('../middlewares/authentication'); // Import authentication middleware

// Register the user routes protected by the authentication middleware
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/user', authentication, userController.getUser);
router.get('/user/isNewUser', authentication, userController.getIsNewUser);

module.exports = router;
