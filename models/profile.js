const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  username: {
    type: String,
  },
  dateJoined: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
