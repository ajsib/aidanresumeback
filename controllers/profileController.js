const User = require('../models/user');
const Profile = require('../models/profile');

// function to create a user's profile
exports.createProfile = async (req, res) => {
  const { firstName, school, interests, proudOf, photos } = req.body;
  const user = await User.findById(req.user.userId).select('_id');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newProfile = new Profile({
    firstName,
    school,
    interests,
    proudOf,
    photos,
    user: user._id,
  });

  await newProfile.save();

  // Update the user's isNewUser field and add the profile
  user.isNewUser = false;
  user.profile = newProfile._id;

  await user.save();

  return res.status(200).json({ message: 'Profile created successfully' });
};

// function to get a user's profile
exports.getProfile = async (req, res) => {
  try {
    // Code to retrieve user profile
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

// function to get a user's profile name
exports.getProfileName = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('profile');

    if (!user || !user.profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { firstName } = user.profile;
    return res.status(200).json({ firstName });
  } catch (error) {
    console.error('Error while fetching profile name:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// function to get a user's profile school
exports.getProfileSchool = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('profile');

    if (!user || !user.profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { school } = user.profile;
    return res.status(200).json({ school });
  } catch (error) {
    console.error('Error while fetching profile school:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// function to get a user's profile interests
exports.getProfileInterests = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('profile');

    if (!user || !user.profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { interests } = user.profile;
    return res.status(200).json({ interests });
  } catch (error) {
    console.error('Error while fetching profile interests:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// function to get a user's profile proudOf
exports.getProfileProudOf = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('profile');

    if (!user || !user.profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { proudOf } = user.profile;
    return res.status(200).json({ proudOf });
  } catch (error) {
    console.error('Error while fetching profile proudOf:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// function to get a user's profile photos
exports.getProfilePhotos = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('profile');

    if (!user || !user.profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { photos } = user.profile;
    return res.status(200).json({ photos });
  } catch (error) {
    console.error('Error while fetching profile photos:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
