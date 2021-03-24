const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const url = `${spotifyBaseURL}shows`

const getShow = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market
  };
  const resp = await axios.get(`${url}/${args.id}`, { headers, params });
  return resp.data;
};

const getShows = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    ids: args.ids.toString(),
    market: args.market
  };
  const resp = await axios.get(`${url}`, { headers, params });
  return resp.data.shows;
};

const getShowsEpisodes = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
    limit: args.limit,
    offset: args.offset
  };
  const resp = await axios.get(`${url}/${args.id}/episodes`, { headers, params });
  return resp.data;
};

module.exports = {
  show: getShow,
  showEpisodes: getShowsEpisodes,
  shows: getShows,
};
