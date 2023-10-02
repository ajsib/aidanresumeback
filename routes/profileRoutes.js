// ./routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { createProfile, getProfile } = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authentication'); // Import the authentication middleware

// Protect these routes with the authentication middleware
router.post('/create', authenticateToken, createProfile);
router.get('/:userId', authenticateToken, getProfile);

// You can add additional routes to get individual fields if needed

module.exports = router;

