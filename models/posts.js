const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  datePosted: { type: Date, default: Date.now },  // Add this field
  front: {
    headline: { type: String, required: true },
    hook: { type: String, required: true },
    callToAction: { type: String, required: true },
    emoji: { type: String, required: true },  // Add this field
  },
  back: {
    authorName: { type: String, required: true },
    paragraph: { type: String, required: true },
    yearOfStudy: { type: String, required: true }, // Add this field
    program: { type: String, required: true },  // Add this field
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


module.exports = mongoose.model('Post', PostSchema);
