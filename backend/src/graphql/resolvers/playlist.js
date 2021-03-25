const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const playlistUrl = `${spotifyBaseURL}playlists`

const getPlaylist = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
  };
  const resp = await axios.get(`${playlistUrl}/${args.playlist_id}`, { headers, params });
  return resp.data;
};

const getPlaylistImages = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${playlistUrl}/${args.playlist_id}/images`, { headers });
  return resp.data;
};

const getPlaylistTracks = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${playlistUrl}/${args.playlist_id}/tracks`, { headers, params });
  return resp.data;
};

const getPlaylists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    limit: args.limit,
    offset: args.offset
  };
  const resp = await axios.get(`${spotifyBaseURL}me/playlists`, { headers, params });
  return resp.data;
};

module.exports = {
  playlist: getPlaylist,
  playlistImages: getPlaylistImages,
  playlistTracks: getPlaylistTracks,
  playlists: getPlaylists,
};
