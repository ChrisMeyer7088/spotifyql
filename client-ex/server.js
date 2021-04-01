const express = require('express'); // Express web server framework
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios').default;
const querystring = require('querystring');

require('dotenv').config()
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your client secret
const redirect_uri = process.env.REDIRECT_URL; // The redirect uri registered with your application

const app = express();
app.use(express.static(__dirname + '/public'))
   .use(cors()) // CORS must be added on client application to successfully redirect
   .use(cookieParser());

// Flow for grabbing access token from server
app.get('/client-cred', async (req, res) => {
  try {
    const body = {
      client_id,
      client_secret
    };
    const resp = await axios.post(process.env.SPOTIFYQL_ENDPOINT + '/token', body);
    const { data } = resp;

    res.redirect('/#' +
      querystring.stringify({
        access_token: data.access_token,
      })
    );
  } catch (err) {
    console.error(err);
    res.redirect('/#' +
      querystring.stringify({
        error: 'Something went wrong fetching token'
      })
    );
  }
});


app.get('/auth-flow', (req, res) => {
  try {
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
      })
    );
  } catch (err) {
    console.error(err);
  }
});

// After accepting Spotify ToS user is sent to registered redirect url
app.get('/callback', async (req, res) => {
  // Get Authorization code from the redirected response
  const code = req.query.code || null;
  if (!code) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'invalid_token'
      })
    );
  } else {
    const params = new URLSearchParams()
    params.append('code', code)
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', redirect_uri)

    const headers = {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    // Retrieve refresh token
    try {
      const resp = await axios.post('https://accounts.spotify.com/api/token', params, { headers });
      const { data } = resp;

      res.redirect('/#' +
        querystring.stringify({
          access_token: data.access_token,
          refresh_token: data.refresh_token
        })
      );
    } catch (err) {
      console.error(err.message)
      res.redirect('/#' +
        querystring.stringify({
          error: 'Token retrieval failed.'
        })
      );
    }
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Application started on port ', port));
