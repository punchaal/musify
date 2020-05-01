const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  profile: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Profile',
  },
  post: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Post',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
