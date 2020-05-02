const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['first_name', 'last_name', '_id']);

    if (!profile) {
      return res.json(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @acess    Private

router.post('/', auth, async (req, res) => {
  const { profile_image, bio } = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;

  console.log(profile_image);
  console.log(bio);

  if (profile_image) profileFields.profile_image = profile_image;
  if (bio) profileFields.bio = bio;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).populate('user', ['first_name', 'last_name', '_id']);

      return res.json(profile);
    }
    //Create
    profile = new Profile(profileFields);

    console.log(profile);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @acess    Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'first_name',
      'last_name',
      '_id',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @acess    Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['first_name', 'last_name']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user and posts
// @acess    Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove user posts

    //Remove Profile
    await Profile.findOneAndDelete({ user: req.user.id });

    //Remove User
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/user/follow/:userid
// @desc     Add a follower
// @acess    Private

router.put('/user/follow/:userid', [auth], async (req, res) => {
  try {
    const follower = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['first_name', 'last_name']);

    // Check if already following exists in the list

    if (
      follower.following.filter(
        (follows) => follows.user.toString() === req.params.userid
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'User already followed' });
    }

    const following = await Profile.findOne({
      user: req.params.userid,
    }).populate('user', ['first_name', 'last_name']);

    const newFollower = {
      user: req.user.id,
    };

    const newFollowing = {
      user: req.params.userid,
    };

    following.followers.unshift(newFollower);
    follower.following.unshift(newFollowing);

    await following.save();
    await follower.save();
    res.json({ following });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/follow
// @desc     Get all followers and following
// @acess    Private

router.get('/follow/:id', [auth], async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    });

    // Get all followers for the user

    const followers = await Promise.all(
      profile.followers.map(async (users) => {
        const test = await Profile.findOne({ user: users.user })
          .select('profile_image')
          .populate('user', ['first_name', 'last_name']);

        return test;
      })
    );

    const following = await Promise.all(
      profile.following.map(async (users) => {
        const test = await Profile.findOne({ user: users.user })
          .select('profile_image')
          .populate('user', ['first_name', 'last_name']);

        return test;
      })
    );

    res.json({ followers: followers, following: following });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile/user/unfollow/:userid
// @desc     Remove a follower
// @acess    Private

router.delete('/user/unfollow/:userid', [auth], async (req, res) => {
  try {
    const follower = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['first_name', 'last_name']);

    const following = await Profile.findOne({
      user: req.params.userid,
    }).populate('user', ['first_name', 'last_name']);

    // Check if already following exists in the list

    const userFollows = follower.following.find(
      (follows) => follows.user.toString() === req.params.userid
    );

    const userFollowing = following.followers.find(
      (following) => following.user.toString() === req.user.id
    );

    if (!userFollows) {
      return res.status(404).json({ msg: 'User is not currently followed' });
    }

    if (!userFollowing) {
      return res.status(404).json({ msg: 'Cannot find the user' });
    }
    //Remove users object from the array

    follower.following = follower.following.filter(
      (user) => user.user.toString() !== req.params.userid
    );
    following.followers = following.followers.filter(
      (user) => user.user.toString() !== req.user.id
    );

    await follower.save();
    await following.save();
    res.json({ following });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
