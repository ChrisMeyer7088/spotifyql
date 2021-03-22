const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');

const getMarkets = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${spotifyBaseURL}markets`, { headers });
  return resp.data.markets;
};

module.exports = {
  markets: getMarkets
}
