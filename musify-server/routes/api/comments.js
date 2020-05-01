const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const Comment = require('../../models/Comment');
const User = require('../../models/User');

// @route     POST api/posts/comment/:id/
// @desc      Comment on a post
// @access    Private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      });

      console.log(req.params.id);

      const newComment = new Comment({
        text: req.body.text,
        user: req.user.id,
        profile: profile._id,
        post: req.params.id,
      });

      const comments = await newComment.save();

      const commentsObject = {
        comments,
        first_name: profile.user.first_name,
        last_name: profile.user.last_name,
        profile_image: profile.profile_image,
      };

      res.json(commentsObject);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/posts/comment/
// @desc      Get all comments for a post
// @access    Private

router.get(
  '/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    try {
      const comments = await Comment.find({ post: req.params.id })
        .populate('user', ['first_name', 'last_name'])
        .populate('profile', ['profile_image']);

      res.json(comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/// TO DO /////
// @route     POST api/posts/comment/:id/:comment_id
// @desc      Delete comment
// @access    Private

router.delete('comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    //Check user

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Remove index

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
