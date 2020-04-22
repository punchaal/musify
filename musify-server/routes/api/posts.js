const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route     POST api/posts
// @desc      Create post
// @access    Private

router.post('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['first_name', 'last_name']);

    console.log(profile);

    console.log(req.body);
    const newPost = new Post({
      song_image: req.body.postDetails.song_image,
      caption: req.body.postDetails.caption_text,
      uri: req.body.postDetails.uri,
      first_name: profile.user.first_name,
      last_name: profile.user.last_name,
      profile_image: profile.profile_image,
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
    let userPosts = [];
    const posts = await Post.find().sort({ date: -1 });
    posts.forEach((post) => {
      if (post.user.toString() === req.user.id) {
        userPosts.push(post);
      }
    });

    res.json(userPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/:id
// @desc      Get posts by ID
// @access    Private

router.get('/:id', [auth], async (req, res) => {
  console.log(req.params);
  try {
    const post = await Post.findById(req.params.id);

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

// @route     PUT api/posts/like/:id/
// @desc      Like a post
// @access    Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/posts/unlike/:id/
// @desc      Unlike a post
// @access    Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    //Remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
      }).populate('user', ['first_name', 'last_name']);

      const post = await Post.findById(req.params.id);

      const newComment = new Post({
        text: req.body.text,
        first_name: profile.user.first_name,
        last_name: profile.user.last_name,
        profile_image: profile.profile_image,
        user: req.user.id,
      });

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

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
