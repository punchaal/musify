const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  username: {
    type: String,
  },
  profile_image: {
    type: String,
  },
  bio: {
    type: String,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
