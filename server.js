// server.js
// Import necessary modules and libraries
const express = require('express'); // Express.js web framework
const mongoose = require('mongoose'); // Mongoose library for MongoDB interaction
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for working with JSON Web Tokens
const dotenv = require('dotenv'); // Library to load environment variables from .env file


// Load environment variables from .env file
dotenv.config();

// Create the User model (as described in Step 4)
const User = require('./models/user');

// Create an instance of the Express application
const app = express();   

// Set the port for the server to listen on. If the PORT environment variable is not defined,
// the server will use port 3000 as a default.
const port = process.env.PORT || 3000;

// Connect to the MongoDB database using the connection string from the .env file
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,  // Use the new URL parser
    useUnifiedTopology: true,  // Use the new server discovery and monitoring engine
  })
    .then(() => {  // The connection was successful
      console.log('Connected to MongoDB');
    })
    .catch((error) => {  // The connection was unsuccessful
      console.error('Error connecting to MongoDB:', error);
    });
  

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

// Route: /user - Get the information of the current logged-in user
app.get('/user', authenticateToken, async (req, res) => {
    try {
      // req.user contains the user's ID extracted from the JWT token during the authentication process
      const user = await User.findById(req.user.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's information (excluding the password)
      const { _id, username } = user;
      return res.status(200).json({ _id, username });
    } catch (error) {
      console.error('Error while fetching user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Middleware to authenticate the JWT token in the request's headers
  function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      // Add the user's ID from the token payload to the request object for use in the /user route
      req.user = user;
      next();
    });
  }
  
// Start the server and make it listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
