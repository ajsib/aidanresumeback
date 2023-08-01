// user.js
// Import necessary modules and libraries
const mongoose = require('mongoose'); // Mongoose library for MongoDB interaction
const bcrypt = require('bcryptjs'); // Library for hashing passwords

// Define the user schema using Mongoose Schema constructor
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
  // 'email or phone' field of type String, which is required (must be present in the document)
  // and should be unique (no two documents can have the same email value)
  emailPhone: {
    type: String,
    required: true,
    unique: true,
  },
  // date joined field of type Date, which is required (must be present in the document)
  dateJoined: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // is new user field of type Boolean, which is required (must be present in the document)
  // and should be set to true by default
  isNewUser: {
    type: Boolean,
    required: true,
    default: true,
  },

  profile:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    default: null,
  }
});

// Hash the password before saving it to the database
// The 'pre' middleware executes before the 'save' operation (saving the document to the database)
userSchema.pre('save', async function (next) {
  // Get a reference to the current user document (this refers to the user being saved)
  const user = this;

  // Check if the password is being modified or is already hashed (no need to re-hash)
  if (!user.isModified('password')) return next();

  // Generate a salt (random data) used for password hashing with a cost factor of 10
  const salt = await bcrypt.genSalt(10);

  // Hash the user's password using the generated salt
  const hashedPassword = await bcrypt.hash(user.password, salt); 

  // Replace the original password with the hashed password in the user document
  user.password = hashedPassword;

  // Continue with the save operation
  next();
});

// Create a Mongoose model for the 'User' collection, based on the 'userSchema'
const User = mongoose.model('User', userSchema);

// Export the 'User' model to make it available for other parts of the application
module.exports = User;
