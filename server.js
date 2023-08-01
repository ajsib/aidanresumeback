// server.js
// Import necessary modules and libraries
const express = require('express'); // Express.js web framework
const mongoose = require('mongoose'); // Mongoose library for MongoDB interaction
const cors = require('cors'); // Library for enabling CORS (Cross-Origin Resource Sharing)
const { MONGODB_URI } = require('./config/env'); // Import the MongoDB URI from the environment configuration
const userRoutes = require('./routes/userRoutes'); // Import userRoutes for handling user-related API endpoints
const profileRoutes = require('./routes/profileRoutes'); // Import profileRoutes for handling profile-related API endpoints

// Create an instance of the Express application
const app = express();

app.use(cors({ origin: '*'
})); // Enable CORS for all requests this allows the frontend to access the API from a different origin

// Middleware to parse incoming JSON data in the request body
// This allows the server to understand JSON data sent in requests
app.use(express.json());

// Connect to the MongoDB database using the provided URI
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB'); // If the connection is successful, this message will be logged
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); // If there's an error during connection, this message will be logged
  });

// Use the userRoutes for handling API requests with '/api' as the base URL
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);

// Define the port number where the server will listen for incoming requests
// If the PORT environment variable is not defined, the server will use port 3000 as a default.
const port = process.env.PORT || 3000;

// Start the server and make it listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // This message will be logged once the server is running and listening for incoming requests
});
