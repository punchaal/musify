const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile',
  },
  song_image: {
    type: String,
  },
  song_name: {
    type: String,
  },
  artist_name: {
    type: String,
  },
  caption: {
    type: String,
  },
  uri: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
