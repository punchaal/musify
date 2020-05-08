const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model('message', PostSchema);
