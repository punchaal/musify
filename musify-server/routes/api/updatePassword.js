const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route     GET api/reset
// @desc      Test route
// @access    Public
router.put(
  '/',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

module.exports = router;
