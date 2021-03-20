const axios = require('axios').default;
const { spotifyBaseURL } = require('../../config')
const url = spotifyBaseURL + 'artists';

function header(req) {
  let token = req.headers.authorization;
  if (!token.includes('Bearer ')) {
    token = 'Bearer ' + token;
  }
  return {
    'Authorization': token
  };
}

const getArtistById = async function(args, req) {
  const headers = header(req);
  const resp = await axios.get(`${url}/${args.id}`, { headers });
  return resp.data;
};

const getArtistsById = async function(args, req) {
  const headers = header(req);
  const params = { ids: args.ids.toString() };
  const resp = await axios.get(`${url}`, { headers, params });
  return resp.data.artists;
};

const getRelatedArtists = async function(args, req) {
  const headers = header(req);
  const resp = await axios.get(`${url}/${args.id}/related-artists`, { headers });
  return resp.data.artists;
}

const artist = {
  artist: getArtistById,
  artists: getArtistsById,
  relatedArtists: getRelatedArtists,
};

module.exports = artist;