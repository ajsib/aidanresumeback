const express = require('express');
const router = express.Router();
const { 
    createProfile, 
    getProfile, 
    getFullProfile,
    getPaginatedPosts, 
    getPaginatedLikes, 
    // getPaginatedFollowing, 
    // getPaginatedFollowers,
    likePost,
    getAllPosts,
    getAllLikes
} = require('../controllers/profileController');

const authenticateToken = require('../middlewares/authentication');

// Previous routes here...
router.post('/create', authenticateToken, createProfile);
router.get('/:userId', authenticateToken, getProfile);
router.get('/full/:profileId', authenticateToken, getFullProfile);
router.get('/:profileId/posts', authenticateToken, getPaginatedPosts);
router.get('/:profileId/likes', authenticateToken, getPaginatedLikes);
// router.get('/:profileId/following', authenticateToken, getPaginatedFollowing);
// router.get('/:profileId/followers', authenticateToken, getPaginatedFollowers);
router.post('/:profileId/like/:postId', authenticateToken, likePost);


module.exports = router;
