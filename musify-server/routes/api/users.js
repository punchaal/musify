const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    check('first_name', 'First name is required')
      .not()
      .isEmpty(),
    check('last_name', 'Last name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email')
      .normalizeEmail()
      .isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
  ],
  (req, res) => {
    console.log(req.body);
    res.send('User route');
  }
);

module.exports = router;
