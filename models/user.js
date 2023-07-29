// Import the Mongoose library
const mongoose = require('mongoose');

// Define the user schema using Mongoose Schema constructor
// A schema is a blueprint for defining the structure of documents in a collection
const userSchema = new mongoose.Schema({
  // 'username' field of type String, which is required (must be present in the document)
  // and should be unique (no two documents can have the same username value)
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // 'password' field of type String, which is required (must be present in the document)
  password: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model for the 'User' collection, based on the 'userSchema'
// Models provide an interface for interacting with the database and are used to perform CRUD operations
const User = mongoose.model('User', userSchema);

// Export the 'User' model to make it available for other parts of the application
module.exports = User;
