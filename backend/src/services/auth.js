const axios = require('axios').default;
const { port, uri } = require('../config');

async function authorize () {
  const resp = await axios.get('https://accounts.spotify.com/authorize', {
    params: {
      client_id: process.env.CLIENT_ID,
      response_type: 'code',
      redirect_uri: `http://${uri}:${port}/callback`
    }
  });
  return resp.data
};

module.exports = {
  authorize
};