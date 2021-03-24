const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');

const search = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    q: args.q,
    type: args.type.toString(),
    market: args.market,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${spotifyBaseURL}search`, { headers, params });
  return resp.data;
};

module.exports = {
  search: search
}