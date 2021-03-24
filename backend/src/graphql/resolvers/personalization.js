const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const url = `${spotifyBaseURL}me/top`

const myTopArtists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    time_range: args.time_range,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${url}/artists`, { headers, params });
  return resp.data;
};

const myTopTracks = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    time_range: args.time_range,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${url}/track`, { headers, params });
  return resp.data;
};

module.exports = {
  myTopArtists: myTopArtists,
  myTopTracks: myTopTracks,
}