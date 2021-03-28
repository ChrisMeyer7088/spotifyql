const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const playlistUrl = `${spotifyBaseURL}playlists`
const followingUrl = `${spotifyBaseURL}me/following`

const getFollowedArtist = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    type: 'artist',
    after: args.after,
    limit: args.limit
  };
  const resp = await axios.get(`${followingUrl}`, { headers, params });
  return resp.data;
};

const followsUsers = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    type: 'user',
    ids: args.ids.toString(),
  };
  const resp = await axios.get(`${followingUrl}/contains`, { headers, params });
  return resp.data;
};

const followsArtists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    type: 'artist',
    ids: args.ids.toString(),
  };
  const resp = await axios.get(`${followingUrl}/contains`, { headers, params });
  return resp.data;
};

const followsPlaylist = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    ids: args.ids.toString(),
  };
  const resp = await axios.get(`${playlistUrl}/${args.playlist_id}/followers/contains`, { headers, params });
  return resp.data;
};

const followArtists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    type: 'artist',
    ids: args.ids.toString(),
  };
  const resp = await axios.put(`${followingUrl}`, null, { headers, params });
  return resp.data;
};

const followUsers = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    type: 'user',
    ids: args.ids.toString(),
  };
  const resp = await axios.put(`${followingUrl}`, null, { headers, params });
  return resp.data;
};

const followPlaylist = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    public: args.public,
  };
  const resp = await axios.put(`${playlistUrl}/${args.playlist_id}/followers`, body, { headers });
  return resp.data;
};

const unfollowUsers = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    type: 'user',
    ids: args.ids.toString(),
  };
  const resp = await axios.delete(`${followingUrl}`, { headers, params });
  return resp.data;
};

const unfollowArtists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    type: 'artist',
    ids: args.ids.toString(),
  };
  const resp = await axios.delete(`${followingUrl}`, { headers, params });
  return resp.data;
};

const unfollowPlaylist = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.delete(`${playlistUrl}/${args.playlist_id}/followers`, { headers });
  return resp.data;
};

module.exports = {
  myArtists: getFollowedArtist,
  followsArtists,
  followsUsers,
  followsPlaylist,
  followArtists,
  followUsers,
  followPlaylist,
  unfollowUsers,
  unfollowArtists,
  unfollowPlaylist,
};
