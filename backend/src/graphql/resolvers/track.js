const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');

const getTrackById = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
  };
  const resp = await axios.get(`${spotifyBaseURL}tracks/${args.id}`, { headers, params });
  return resp.data;
};

const getTracksByIds = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    market: args.market,
    ids: args.ids.toString(),
  };
  const resp = await axios.get(`${spotifyBaseURL}tracks`, { headers, params });
  return resp.data.tracks;
};

const getAudioFeatureByTrack = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${spotifyBaseURL}audio-features/${args.id}`, { headers });
  return resp.data;
};

const getAudioFeaturesByTracks = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    ids: args.ids.toString(),
  };
  const resp = await axios.get(`${spotifyBaseURL}audio-features`, { headers, params });
  return resp.data.audio_features;
};

module.exports = {
  track: getTrackById,
  tracks: getTracksByIds,
  trackAudioFeature: getAudioFeatureByTrack,
  tracksAudioFeatures: getAudioFeaturesByTracks,
}
