const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token')
const { spotifyBaseURL } = require('../../config')
const url = spotifyBaseURL + 'albums';

const getAlbumById = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
  }
  const resp = await axios.get(`${url}/${args.id}`, { headers, params });
  return resp.data;
};

const getAlbumsByIds = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
    ids: args.ids.toString()
  }
  const resp = await axios.get(`${url}`, { headers, params });
  return resp.data.albums;
};

const getTracksByAlbum = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
    limit: args.limit,
    offset: args.offset
  }
  const resp = await axios.get(`${url}/${args.id}/tracks`, { headers, params });
  return resp.data.items;
};

module.exports = {
  album: getAlbumById,
  albums: getAlbumsByIds,
  albumTracks: getTracksByAlbum
}