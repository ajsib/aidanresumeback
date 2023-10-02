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
  interests: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  projects: {
    type: [String],
  },
  contactInformation: {
    type: String,
  },
  clubsAndOrgs: {
    type: [String],
  },
  coursesTaken: {
    type: [String],
  },
  hometown: {
    type: String,
  },
  favoriteCampusSpots: {
    type: [String],
  },
  alumniStatus: {
    type: String,
  },
  jobStatus: {
    type: String,
  },
  favoriteArticles: {
    type: [String],
  },
  eventsParticipated: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
