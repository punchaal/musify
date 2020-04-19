const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     POST api/posts
// @desc      Create post
// @access    Private

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      song_image: req.body.song_image,
      caption: req.body.caption,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts
// @desc      Get all posts
// @access    Private

router.get('/', [auth], async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/:userid
// @desc      Get all posts for a user
// @access    Private

router.get('/user', [auth], async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (posts.user.toString() === req.user.id) {
      res.json(posts);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/:id
// @desc      Get posts by ID
// @access    Private

router.get('/:id', [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.user.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/posts/:id
// @desc      Delete a post by ID
// @access    Private

router.delete('/:id', [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.parms.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //Check user

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post Removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
