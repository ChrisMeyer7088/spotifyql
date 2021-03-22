const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');

const getUserById = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${spotifyBaseURL}users/${args.user_id}`, { headers });
  return resp.data;
};

const getMe = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${spotifyBaseURL}me`, { headers });
  return resp.data;
};

module.exports = {
  user: getUserById,
  me: getMe,
}
