const Post = require('../models/posts'); 
const User = require('../models/user');
const Profile = require('../models/profile'); 

// create a post
exports.createPost = async (req, res) => {
  const userId = req.user.userId;
  const {
    front: {
      headline,
      hook,
      callToAction,
      emoji
    },
    back: {
      authorName,
      paragraph,
      yearOfStudy,
      program
    }
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newPost = new Post({
      datePosted: new Date(),
      front: {
        headline,
        hook,
        callToAction,
        emoji
      },
      back: {
        authorName,
        paragraph,
        yearOfStudy,
        program
      },
      author: userId,
    });

    // Populate authorProfile from User and Profile models
    const profile = await Profile.findById(user.profile);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    newPost.authorProfile = {
      username: user.username,
      emoji: profile.emoji,
      authorID: profile._id
    };
    console.log(newPost);

    await newPost.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });
    await Profile.findByIdAndUpdate(user.profile, { $push: { 'postInfo.posts': newPost._id } });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating the post:', error);
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userId = req.user.userId;
    await User.findByIdAndUpdate(userId, { $pull: { posts: deletedPost._id } });

    const user = await User.findById(userId);
    if (user.profile) {
      await Profile.findByIdAndUpdate(user.profile, { $pull: { posts: deletedPost._id } });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting the post:', error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ datePosted: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching the posts' });
  }
};

// Get a post by its ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching the post:', error);
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
};

// Get posts for infinite scroll
exports.getPaginatedPosts = async (req, res) => {
  const { start = 0, limit = 29 } = req.query;  // Default limit changed to 11

  // Validate query parameters
  const parsedStart = parseInt(start);
  const parsedLimit = Math.min(29, parseInt(limit));  // Max limit of 11 posts per request

  if (isNaN(parsedStart) || isNaN(parsedLimit)) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  try {
    const posts = await Post.find()
      .skip(parsedStart)
      .limit(parsedLimit)
      .sort({ datePosted: -1 });
  
    res.status(200).json({ 
      posts, 
      nextStart: parsedStart + parsedLimit // useful for infinite scroll
    });
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching the posts' });
  }
};