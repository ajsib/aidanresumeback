const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  datePosted: { type: Date, default: Date.now },
  front: {
    headline: { type: String, required: true },
    hook: { type: String, required: true },
    callToAction: { type: String, required: true },
    emoji: { type: String, required: true }, 
  },
  back: {
    authorName: { type: String, required: true },
    paragraph: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    program: { type: String, required: true }, 
  },
  authorProfile: {  
    username: { type: String}, 
    authorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
  },
  numLikes : { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


module.exports = mongoose.model('Post', PostSchema);
