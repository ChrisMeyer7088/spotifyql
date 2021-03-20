const axios = require('axios').default;
const spotifyBaseURL = 'https://api.spotify.com/v1';

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
  const resp = await axios.get(`${spotifyBaseURL}/artists/${args.id}`, { headers });
  return resp.data;
};

const getArtistsById = async function(args, req) {
  const headers = header(req);
  const params = { ids: args.ids.toString() };
  const resp = await axios.get(`${spotifyBaseURL}/artists`, { headers, params });
  return resp.data.artists;
};

const artist = {
  artist: getArtistById,
  artists: getArtistsById,
};

module.exports = artist;