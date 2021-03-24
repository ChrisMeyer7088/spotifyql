const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const url = `${spotifyBaseURL}episodes`

const getEpisode = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
  };
  const resp = await axios.get(`${url}/${args.id}`, { headers, params });
  return resp.data;
};

const getEpisodes = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    ids: args.ids.toString(),
    market: args.market,
  };
  const resp = await axios.get(`${url}`, { headers, params });
  return resp.data.episodes;
};

module.exports = {
  episode: getEpisode,
  episodes: getEpisodes,
};
