// Import necessary modules and libraries
const express = require('express'); // Express.js web framework
const mongoose = require('mongoose'); // Mongoose library for MongoDB interaction
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for working with JSON Web Tokens
const dotenv = require('dotenv'); // Library to load environment variables from .env file

// Load environment variables from .env file
dotenv.config();

// Create the User model (as described in Step 4)
// [User model is not provided in this code snippet, but it should be created.]

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on. If the PORT environment variable is not defined,
// the server will use port 3000 as a default.
const port = process.env.PORT || 3000;

// Connect to the MongoDB database (as described in Step 3)
// [Code for connecting to the MongoDB database is not provided in this snippet, but it should be added before app.listen()]

// Middleware to parse incoming JSON data
app.use(express.json());

// Route: /register - Create a new user in the database
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Create a new user and save it to the database
    const newUser = new User({ username, password });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: /login - Check the provided username and password and respond with an authentication token
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token with the user's ID as the payload
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: /logout - Invalidate the user's session (in this example, do nothing for simplicity)
app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

// app.all() is a special routing method that is used to load middleware functions
// It is called every time a request is received on any route (in this example, it is used to handle 404 Not Found errors)
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });
  
// Start the server and make it listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
