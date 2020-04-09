const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// @route     GET api/reset
// @desc      Test route
// @access    Public
router.put('/', async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.username,
    });

    if (user !== null) {
      console.log('User exists in db');
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(req.body.password, salt);

      await user.update({
        password: user.password,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });

      console.log('password updated');
      res.status(200).send({ message: 'Password updated' });
    } else {
      console.log('No user exists in the database to update');
      res.status(404).json('No user exists in the database to update');
    }
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
