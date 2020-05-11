const express = require('express');
const router = express.Router();
const moment = require('moment');

const auth = require('../../middleware/auth');

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

    console.log(req.body);
    const newPost = new Post({
      song_image: req.body.postDetails.song_image,
      caption: req.body.postDetails.caption_text,
      uri: req.body.postDetails.uri,
      user: req.user.id,
      song_name: req.body.postDetails.song_name,
      artist_name: req.body.postDetails.artist_name,
      profile: profile._id,
    });

    const posts = await newPost.save();

    const post = {
      ...newPost,
      first_name: profile.user.first_name,
      last_name: profile.user.last_name,
      profile_image: profile.profile_image,
    };

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
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('user', ['first_name', 'last_name'])
      .populate('profile', ['profile_image']);

    // const newPosts = posts.map((post) => post.user);

    // const profiles = await Profile.find().where('user').in(newPosts);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/popular
// @desc      Get all popular posts sorted by likes and date
// @access    Private

router.get('/popular', [auth], async (req, res) => {
  try {
    let start = moment().subtract(7, 'days').toDate();
    const aggregate = await Post.aggregate([
      {
        $match: { date: { $gte: start } },
      },
      {
        $addFields: { likes_count: { $size: { $ifNull: ['$likes', []] } } },
      },
      { $sort: { likes_count: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profile',
          foreignField: '_id',
          as: 'profiles',
        },
      },
      // { $limit: 45 },
    ])
      .unwind('user')
      .unwind('profiles');

    res.json(aggregate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/following
// @desc      Get all posts a user follows sorted by time
// @access    Private

router.get('/following', [auth], async (req, res) => {
  try {
    // Find all users the logged in user follows

    const profile = await Profile.findOne({
      user: req.user.id,
    });

    let followingArray = [];
    const following = profile.following.map((follows) => {
      followingArray.push(follows.user);
    });

    const posts = await Post.find()
      .where('user')
      .in(followingArray)
      .sort({ date: -1 })
      .populate('user', ['first_name', 'last_name'])
      .populate('profile', ['profile_image']);
    // .limit(45);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/user
// @desc      Get all posts for private profile
// @access    Private

router.get('/user', [auth], async (req, res) => {
  try {
    let userPosts = [];
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('user', ['first_name', 'last_name'])
      .populate('profile', ['profile_image']);

    posts.forEach((post) => {
      if (post.user._id.toString() === req.user.id) {
        userPosts.push(post);
      }
    });

    res.json(userPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/posts/user/:userid
// @desc      Get all posts for public profile
// @access    Private

router.get('/user/:userid', [auth], async (req, res) => {
  try {
    let userPosts = [];
    const posts = await Post.find()
      .sort({ date: -1 })
      .populate('user', ['first_name', 'last_name'])
      .populate('profile', ['profile_image']);
    posts.forEach((post) => {
      if (post.user._id.toString() === req.params.userid) {
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
    const post = await Post.findById(req.params.id)
      .populate('user', ['first_name', 'last_name'])
      .populate('profile', ['profile_image']);

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
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
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

module.exports = router;
