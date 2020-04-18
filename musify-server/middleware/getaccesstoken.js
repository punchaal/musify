require('dotenv').config();
const client = require('../src/redis-local');
const request = require('request');
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;

module.exports = async function (req, res, next) {
  if ((await client.get(`${req.user.id}-access`)) === null) {
    // requesting access token from refresh token
    let userId = req.user.id;

    // Find user in the db to get their refresh token
    let user = await User.findById(userId);
    let refresh_token = user.refresh_token;

    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      },
      json: true,
    };

    try {
      await request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let access_token = body.access_token;

          client.setex(`${user._id}-access`, 3600, access_token);
        }
      });
      console.log('Got a new access token!');
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Failed to get a new token' });
    }
  }
  next();
};
