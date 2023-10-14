const User = require('../models/user');
const Profile = require('../models/profile');
const Post = require('../models/posts');

// Function to create a user's profile
exports.createProfile = async (req, res) => {
  const { name, program, yearOfStudy, bio, profilePhoto } = req.body;

  // Note the .select() method now includes 'username' and 'dateJoined'
  const user = await User.findById(req.user.userId).select('_id username dateJoined');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newProfile = new Profile({
    name,
    program,
    yearOfStudy,
    bio,
    profilePhoto,
    username: user.username,  // This should now be populated
    dateJoined: user.dateJoined, // This should now be populated
    user: user._id,
  });

  await newProfile.save();

  // Update the user's isNewUser field and add the profile
  user.isNewUser = false;
  user.profile = newProfile._id;
  await user.save();

  return res.status(200).json({ 
    message: 'Profile created successfully',
    profile: newProfile // Adding the newly created profile here
  });
};

// Function to get a user's profile information without postInfo and network 
exports.getFullProfile = async (req, res) => {
  try {
    const { profileId } = req.params;  // Note that it's profileId, not userId
    const profile = await Profile.findById(profileId)
      .select('name program yearOfStudy bio profilePhoto username dateJoined -_id');  // Only select the fields you want

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error while fetching user profile:', error); 
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to like a post as the current user
exports.likePost = async (req, res) => {
  const { postId, profileId } = req.params; 

  if (!profileId) {
    return res.status(400).json({ message: 'Profile ID is missing' });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (profile.postInfo.likes.includes(String(postId))) {
      return res.status(400).json({ message: 'Post already liked by this user' });
    }

    // Increment like count
    post.numLikes += 1;
    await post.save();

    // Add the like to the profile's postInfo.likes array
    profile.postInfo.likes.push(postId);
    await profile.save();

    return res.status(200).json({
      message: 'Post liked successfully',
      numLikes: post.numLikes,
      updatedLikes: profile.postInfo.likes
    });
  } catch (error) {
    console.error(`Error while liking the post: ${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// Function to get a user's profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('profile');

    if (!user || !user.profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json(user.profile);
  } catch (error) {
    console.error('Error while fetching user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// paginated posts
exports.getPaginatedPosts = async (req, res) => {
  try {
    const { start = 0, limit = 10 } = req.query;
    const { profileId } = req.params;

    // Fetch the specific profile
    const profile = await Profile.findById(profileId)
      .populate({
        path: 'postInfo.posts',
        options: { skip: parseInt(start), limit: parseInt(limit) },
      });

    if (!profile) return res.status(404).send('Profile not found');

    const nextStart = parseInt(start) + profile.postInfo.posts.length;
    res.json({ posts: profile.postInfo.posts, nextStart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



// paginated likes
exports.getPaginatedLikes = async (req, res) => {
  try {
    const { start = 0, limit = 10 } = req.query;
    const { profileId } = req.params;

    // Fetch the specific profile
    const profile = await Profile.findById(profileId)
      .populate({
        path: 'postInfo.likes',
        options: { skip: parseInt(start), limit: parseInt(limit) },
      });

    if (!profile) return res.status(404).send('Profile not found');

    const nextStart = parseInt(start) + profile.postInfo.likes.length;
    res.json({ likes: profile.postInfo.likes, nextStart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};