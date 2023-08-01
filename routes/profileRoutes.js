// ./routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { createProfile, getProfile, getProfileName, getProfileSchool, getProfileInterests, getProfileProudOf, getProfilePhotos } = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authentication'); // Import the authentication middleware

// Protect these routes with the authentication middleware
router.post('/create', authenticateToken, createProfile);
router.get('/:userId', authenticateToken, getProfile);
router.get('/:userId/name', authenticateToken, getProfileName);
router.get('/:userId/school', authenticateToken, getProfileSchool);
router.get('/:userId/interests', authenticateToken, getProfileInterests);
router.get('/:userId/proudOf', authenticateToken, getProfileProudOf);
router.get('/:userId/photos', authenticateToken, getProfilePhotos);

module.exports = router;
