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
  const params = { ids: args.ids };
  const resp = await axios.get(`${spotifyBaseURL}/artists/${args.ids}`, { headers, params });
  console.log(resp.data)
  return resp.data;
};

const artist = {
  artist: getArtistById,
  artists: getArtistsById,
};

module.exports = artist;