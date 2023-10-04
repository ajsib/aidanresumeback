const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authentication = require('../middlewares/authentication'); // Import authentication middleware

// Protected routes
router.post('/', authentication, postsController.createPost);
router.delete('/:id', authentication, postsController.deletePost);

// Public routes
router.get('/', postsController.getAllPosts);

// Paginated route for infinite scroll
router.get('/paginated', postsController.getPaginatedPosts);  // Move this line up

// This should come last among the GET routes
router.get('/:id', postsController.getPostById);

module.exports = router;
