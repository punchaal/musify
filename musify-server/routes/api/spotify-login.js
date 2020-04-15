const express = require('express');
const router = express.Router();
let request = require('request');
let querystring = require('querystring');
require('dotenv').config();
const auth = require('../../middleware/auth');
const client = require('../../src/redis-local');

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI;

router.get('/', (req, res) => {
  let generateRandomString = function (length) {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  let stateKey = 'spotify_auth_state';

  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Request authorization
  let scope = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.post('/callback', auth, (req, res) => {
  // Application requests refresh and access tokens
  // after checking the state parameter
  let code = req.body.code || null;
  let state = req.body.state || null;
  // let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    // res.clearCookie(stateKey);
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, async (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;
        try {
          let user = await User.findOneAndUpdate(
            { _id: req.user.id },
            {
              $set: {
                refresh_token: refresh_token,
              },
            },
            { new: true }
          );

          // Set access token to Redis

          client.setex(`${user._id}-access`, 3600, access_token);

          return res.json(user);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
      } else {
        res.send('Something went wrong');
      }
    });
  }
});

router.post('/refresh_token', auth, async (req, res) => {
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
        res.send({
          access_token: access_token,
        });

        client.setex(`${user._id}-access`, 3600, access_token);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
