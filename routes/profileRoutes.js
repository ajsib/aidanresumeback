// ./routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { 
    createProfile, 
    getProfile, 
    getFullProfile,
    getPaginatedPosts, 
    getPaginatedLikes, 
    getPaginatedFollowing, 
    getPaginatedFollowers,
    likePost,
 } = require('../controllers/profileController');

const authenticateToken = require('../middlewares/authentication');

// Protect these routes with the authentication middleware
router.post('/create', authenticateToken, createProfile);
router.get('/:userId', authenticateToken, getProfile);

router.get('/:profileId/posts', authenticateToken, getPaginatedPosts);
router.get('/:profileId/likes', authenticateToken, getPaginatedLikes);
router.get('/:profileId/following', authenticateToken, getPaginatedFollowing);
router.get('/:profileId/followers', authenticateToken, getPaginatedFollowers);
router.get('/full/:profileId', authenticateToken, getFullProfile);
router.post('/:profileId/like/:postId', authenticateToken, likePost);



module.exports = router;