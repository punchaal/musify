const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  members: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema
);
