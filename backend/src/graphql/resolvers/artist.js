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

const getAlbumsByAritstId = async function(args, req) {
  const headers = header(req);
  const params = {
    offset: args.offset,
    limit: args.limit,  
    market: args.market,
    include_groups: args.include_groups,
  }
  const resp = await axios.get(`${url}/${args.id}/albums`, { headers, params });
  return resp.data.items;
};

const getArtistTopTracks = async function(args, req) {
  const headers = header(req);
  const params = {
    market: args.market,
  }
  const resp = await axios.get(`${url}/${args.id}/top-tracks`, { headers, params });
  return resp.data.tracks;
};

const artist = {
  artist: getArtistById,
  artists: getArtistsById,
  relatedArtists: getRelatedArtists,
  artistAlbums: getAlbumsByAritstId,
  artistTopTracks: getArtistTopTracks,
};

module.exports = artist;