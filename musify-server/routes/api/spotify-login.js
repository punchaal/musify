const express = require('express');
const router = express.Router();
var request = require('request');
var querystring = require('querystring');
require('dotenv').config();
const auth = require('../../middleware/auth');

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;

router.get('/', (req, res) => {
  var generateRandomString = function (length) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  var stateKey = 'spotify_auth_state';

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Request authorization
  var scope = 'user-read-private user-read-email';
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
  var code = req.body.code || null;
  var state = req.body.state || null;
  // var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    console.log('Now I am here');
    // res.clearCookie(stateKey);
    var authOptions = {
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
        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        try {
          let user = await User.findOneAndUpdate(
            { _id: req.user.id },
            {
              $set: {
                refresh_token: refresh_token,
                access_token: access_token,
              },
            },
            { new: true }
          );
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

router.get('/refresh_token', async (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
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
    await axios.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          access_token: access_token,
        });
      }
    });
  } catch (err) {
    console.error('Error');
  }
});

module.exports = router;
