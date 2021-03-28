const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const playlistUrl = `${spotifyBaseURL}playlists`
const usersUrl = `${spotifyBaseURL}users`

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

const getUserPlaylists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    limit: args.limit,
    offset: args.offset
  };
  const resp = await axios.get(`${usersUrl}/${args.user_id}/playlists`, { headers, params });
  return resp.data;
};

const createPlaylist = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    name: args.name,
    public: args.public,
    collaborative: args.collaborative,
    description: args.description,
  }
  const resp = await axios.post(`${usersUrl}/${args.user_id}/playlists`, body, { headers });
  return resp.data;
};

const addItemsToPlaylist = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    position: args.position,
    uris: args.uris,
  }
  const resp = await axios.post(`${playlistUrl}/${args.playlist_id}/tracks`, body, { headers });
  return resp.data;
};

const changePlaylist = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    name: args.name,
    public: args.public,
    collaborative: args.collaborative,
    description: args.description,
  }
  const resp = await axios.put(`${playlistUrl}/${args.playlist_id}`, body, { headers });
  return resp.status;
};

const reorderPlaylistTracks = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    uris: args.uris,
    range_start: args.range_start,
    insert_before: args.insert_before,
    range_length: args.range_length,
  }
  const resp = await axios.put(`${playlistUrl}/${args.playlist_id}/tracks`, body, { headers });
  return resp.data;
};

const deletePlaylistTracks = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    tracks: args.uris.map(uri => {
      return {
        uri
      }
    }),
  }
  const resp = await axios.delete(`${playlistUrl}/${args.playlist_id}/tracks`, body, { headers });
  return resp.data;
};

module.exports = {
  playlist: getPlaylist,
  playlistImages: getPlaylistImages,
  playlistTracks: getPlaylistTracks,
  playlists: getPlaylists,
  userPlaylists: getUserPlaylists,
  createPlaylist,
  addToPlaylist: addItemsToPlaylist,
  changePlaylist,
  reorderPlaylist: reorderPlaylistTracks,
  removePlaylistTracks: deletePlaylistTracks,
};
