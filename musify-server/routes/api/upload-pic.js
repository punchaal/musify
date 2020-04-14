const express = require('express');
const router = express.Router();
require('dotenv').config();
const Profile = require('../../models/Profile');
const multer = require('multer');
const cloudinary = require('cloudinary');
const auth = require('../../middleware/auth');

//IMAGE UPLOAD CONFIGURATION

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are accepted!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

let apiKey = process.env.CLOUDINARY_API_KEY;
let apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: 'drpoajdvj',
  api_key: apiKey,
  api_secret: apiSecret,
});

router.post('/add', auth, upload.single('image'), (req, res) => {
  console.log(req.file);
  cloudinary.v2.uploader.upload(req.file.path, async function (err, result) {
    if (err) {
      req.json(err.message);
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { profile_image: result.secure_url } },
          { new: true }
        ).populate('user', ['first_name', 'last_name']);
      }

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
});

module.exports = router;
