// models/profile.js

// Import the Mongoose library
const mongoose = require('mongoose');

// Define the ProfileSchema using Mongoose Schema constructor
// The ProfileSchema will define the structure of the Profile documents in the MongoDB collection
const ProfileSchema = mongoose.Schema({
  // firstName field of type String: Represents the first name of the user associated with the profile
  firstName: {
    type: String,
    required: true,
  },

  // school field of type String: Represents the school of the user associated with the profile
  school: {
    type: String,
    required: true,
  },

  // interests field of type String: Represents the interests of the user associated with the profile
  interests: {
    type: [String]
  },

  // proudOf field of type String: Represents something the user is proud of
  proudOf: String,

  // photos field of type Array of Strings: Represents an array of URLs to images
  // Each URL is a link to an image associated with the user's profile
  photos: [String],

  // user field of type ObjectId: Represents a reference to a User document in the MongoDB collection
  // This establishes a relationship between the Profile and User collections
  // The `ref: 'User'` indicates that this ObjectId references the 'User' model (collection)
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true,
    },
});

// Export the Profile model to make it available for other parts of the application
// The model will represent the 'Profile' collection in the MongoDB database
// When interacting with the 'Profile' collection, we will use this model
module.exports = mongoose.model('Profile', ProfileSchema);
