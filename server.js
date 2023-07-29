// Import necessary modules and libraries
const express = require('express'); // Express.js web framework
const mongoose = require('mongoose'); // Mongoose library for MongoDB interaction
const dotenv = require('dotenv'); // Library to load environment variables from .env file

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on. If the PORT environment variable is not defined,
// the server will use port 3000 as a default.
const port = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB'); // If the connection is successful, this message will be logged
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error); // If there's an error during connection, this message will be logged
  });

// Define a route for the root URL (http://localhost:{port}/)
app.get('/', (req, res) => {
  res.send('Hello, this is your backend server!'); // When a request is made to the root URL, this response will be sent to the client
});

// Start the server and make it listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // This message will be logged once the server is running and listening for incoming requests
});
