const express = require('express');
const router = express.Router();

// @route     GET api/reset
// @desc      Test route
// @access    Public
router.get('/', async (req, res) => {
  try {
    console.log(req.query.resetPasswordToken);
    let user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });
    if (user === null) {
      console.log('Password reset link is invalid or has expired');
      res.json('Password reset link is invalid or has expired');
    } else {
      console.log(user.email);
      res.status(200).send({
        username: user.email,
        message: 'Password reset link has been verified',
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
