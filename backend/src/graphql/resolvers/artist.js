const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token')
const { spotifyBaseURL } = require('../../config')
const url = spotifyBaseURL + 'artists';

const getArtistById = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${url}/${args.id}`, { headers });
  return resp.data;
};

const getArtistsById = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = { ids: args.ids.toString() };
  const resp = await axios.get(`${url}`, { headers, params });
  return resp.data.artists;
};

const getRelatedArtists = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${url}/${args.id}/related-artists`, { headers });
  return resp.data.artists;
}

const getAlbumsByAritstId = async function(args, req) {
  const headers = getAuthHeader(req);
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
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
  }
  const resp = await axios.get(`${url}/${args.id}/top-tracks`, { headers, params });
  return resp.data.tracks;
};

module.exports = {
  artist: getArtistById,
  artists: getArtistsById,
  relatedArtists: getRelatedArtists,
  artistAlbums: getAlbumsByAritstId,
  artistTopTracks: getArtistTopTracks,
};
