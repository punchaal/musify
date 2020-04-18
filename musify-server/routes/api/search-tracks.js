const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const getaccesstoken = require('../../middleware/getaccesstoken');
const axios = require('axios');
const client = require('../../src/redis-local');

router.post('/', [auth, getaccesstoken], async (req, res) => {
  try {
    console.log(req.body.newValue);
    let q = req.body.newValue;
    const endpoint = 'https://api.spotify.com/v1/search';

    const access_token = await client.get(`${req.user.id}-access`);

    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    };

    let tracks = await axios.get(
      `${endpoint}?q=${q}&type=track&market=ca&limit=25`,
      headers
    );

    res.status(200).send(tracks.data.tracks.items);
  } catch (err) {
    console.error(console.log(err.response));
    res.status(500).send('Server error');
  }
});

module.exports = router;
