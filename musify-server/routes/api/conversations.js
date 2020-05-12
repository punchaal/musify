const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Conversation = require('../../models/Conversation');

// @route     POST api/conversation
// @desc      Create conversation if not existent
// @access    Private

router.post('/', auth, async (req, res) => {
  console.log(req.body);
  try {
    let conversation = await Conversation.findOne({
      'members.user': req.body.sender.user,
      'members.user': req.body.receiver.user,
    });

    let members = [];
    members.push(req.body.sender);
    members.push(req.body.receiver);

    if (conversation) {
      return res.json(conversation);
    } else {
      conversation = new Conversation({
        members: members,
      });
    }

    conversation.save();
    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/conversation
// @desc      Get all conversations for logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  console.log(req.user);
  try {
    let conversation = await Conversation.find({
      'members.user': req.user.id,
    });
    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
