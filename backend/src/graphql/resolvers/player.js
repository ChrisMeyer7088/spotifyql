const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const url = `${spotifyBaseURL}me/player`;

const getPlayerInfo = async function(args, req) {
  const headers = getAuthHeader(req);
  let additional_types = null;
  if (args.additional_types) {
    additional_types = args.additional_types.toString()
  }
  const params = {
    market: args.market,
    additional_types: helperAdditionalTypes(args),
  };
  const resp = await axios.get(`${url}`, { headers, params });
  return resp.data;
};

const getDevices = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${url}/devices`, { headers });
  return resp.data.devices;
};

const getPlayingTrack = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
    additional_types: helperAdditionalTypes(args),
  };
  const resp = await axios.get(`${url}/currently-playing`, { headers, params });
  return resp.data;
};

const getRecentlyPlayed = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    limit: args.limit,
    after: args.after,
    before: args.before,
  };
  const resp = await axios.get(`${url}/recently-played`, { headers, params });
  return resp.data.items;
};

const postNextTrack = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    device_id: args.device_id,
  };
  const resp = await axios.post(`${url}/next`, body, { headers });
  return resp.status;
};

const postPreviousTrack = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    device_id: args.device_id,
  };
  const resp = await axios.post(`${url}/previous`, body, { headers });
  return resp.status;
};

const postToPlaybackQueue = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    uri: args.uri,
    device_id: args.device_id,
  };
  const resp = await axios.post(`${url}/queue`, body, { headers });
  return resp.status;
};

const putPausePlayback = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    device_id: args.device_id,
  };
  const resp = await axios.put(`${url}/pause`, body, { headers });
  return resp.status;
};

const putPlayPlayback = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    device_id: args.device_id,
  };
  const resp = await axios.put(`${url}/play`, body, { headers });
  return resp.status;
};

const putRepeatMode = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    state: "context",
    device_id: args.device_id,
  };
  const resp = await axios.put(`${url}/repeat`, null, { headers, params });
  return resp.status;
};

const putShuffleMode = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    state: args.state,
    device_id: args.device_id,
  };
  const resp = await axios.put(`${url}/shuffle`, null, { headers, params });
  return resp.status;
};

const putSeek = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    position_ms: args.position_ms,
    device_id: args.device_id,
  };
  const resp = await axios.put(`${url}/seek`, null, { headers, params });
  return resp.status;
};

const putVolume = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    volume_percent: args.volume_percent,
    device_id: args.device_id,
  };
  const resp = await axios.put(`${url}/volume`, null, { headers, params });
  return resp.status;
};

const putTransferPlayback = async function(args, req) {
  const headers = getAuthHeader(req);
  const body = {
    device_ids: args.device_ids,
    play: args.play,
  };
  const resp = await axios.put(`${url}/volume`, body, { headers });
  return resp.status;
};

function helperAdditionalTypes(args) {
  let additional_types = null;
  if (args.additional_types) {
    additional_types = args.additional_types.toString();
  };
  return additional_types;
}

module.exports = {
  player: getPlayerInfo,
  devices: getDevices,
  currentTrack: getPlayingTrack,
  recentlyPlayed: getRecentlyPlayed,
  nextTrack: postNextTrack,
  previousTrack: postPreviousTrack,
  addToQueue: postToPlaybackQueue,
  pausePlayback: putPausePlayback,
  playPlayback: putPlayPlayback,
  repeatPlayer: putRepeatMode,
  seekTo: putSeek,
  shufflePlayer: putShuffleMode,
  volumeTo: putVolume,
  transferPlayback: putTransferPlayback,
};
