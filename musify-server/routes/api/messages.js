const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Message = require('../../models/Message');

// @route     GET api/messages
// @desc      Get all messages for a conversation
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    let messages = await Message.find({
      conversationId: req.body.conversationId,
    });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
