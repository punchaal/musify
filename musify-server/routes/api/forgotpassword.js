const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');

// @route     POST api/forgotpass
// @desc      Test route
// @access    Public
router.post(
  '/',
  [check('email', 'Please include a valid email').normalizeEmail().isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User not in database' }] });
      } else {
        const token = crypto.randomBytes(20).toString('hex');

        await user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        });

        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: 'mySqlDemoEmail@gmail.com',
          to: `${user.email}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
            `http://localhost:3000/reset/${token}\n\n` +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    } catch (err) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
