// userController.js
const User = require('../models/user'); // Import the User model
const jwt = require('../utils/jwt'); // Import JWT utility for generating and verifying JSON Web Tokens
const bcrypt = require('bcryptjs'); // Library for hashing passwords

// Function for user registration
exports.register = async (req, res) => {
  try {
    const { username, password, emailPhone } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken, please try a new one!' });
    }

    // Check if the email or phone already exists in the database
    const existingEmailPhone = await User.findOne({ emailPhone });
    if (existingEmailPhone) {
      return res.status(409).json({ message: 'Email or phone already registered! Please log in' });
    }

    // Create a new user and save it to the database
    const newUser = new User({ username, password, emailPhone, dateJoined: Date.now(), isNewUser: true });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function for user login
exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Check if the username or email exists in the database
    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { emailPhone: usernameOrEmail }]
      });
      if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token with the user's ID as the payload
    const token = jwt.signToken({ userId: user._id });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function for user logout
exports.logout = (req, res) => {
    try {
      // You may add any additional logic here, such as clearing cookies or session data, if needed.
  
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

// Function for getting user information
exports.getUser = async (req, res) => {
  try {
    // req.user contains the user's ID extracted from the JWT token during the authentication process
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's information (excluding the password)
    const { _id, username, emailPhone, isNewUser, dateJoined } = user;
    return res.status(200).json({ _id, username, emailPhone, isNewUser, dateJoined });
  } catch (error) {
    console.error('Error while fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get the user's isNewUser field
exports.getIsNewUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ isNewUser: user.isNewUser });
  } catch (error) {
    console.error('Error while fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
