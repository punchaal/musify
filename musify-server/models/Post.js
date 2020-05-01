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
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
      },
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },

      profile_image: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
