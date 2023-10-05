const User = require('../models/user');
const Profile = require('../models/profile');

// Function to create a user's profile
exports.createProfile = async (req, res) => {
  const { name, program, yearOfStudy, bio, profilePhoto } = req.body;
  const user = await User.findById(req.user.userId).select('_id');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newProfile = new Profile({
    name,
    program,
    yearOfStudy,
    bio,
    profilePhoto,
    username: user.username,
    dateJoined: user.dateJoined,
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

// You can add additional functions to get individual fields if needed
