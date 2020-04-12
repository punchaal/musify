const express = require('express');
const router = express.Router();
require('dotenv').config();
const Profile = require('../../models/Profile');
const multer = require('multer');
const cloudinary = require('cloudinary');

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

router.post('/add', upload.single('image'), (req, res) => {
  console.log(req.file);
  cloudinary.v2.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      req.json(err.message);
    }
    Profile.update({
      profile_image: result.secure_url,
    });

    res.send(req.file);
  });
});

module.exports = router;
