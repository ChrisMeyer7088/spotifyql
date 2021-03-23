const axios = require('axios').default;
const { getAuthHeader } = require('../../services/token');
const { spotifyBaseURL } = require('../../config');
const url = `${spotifyBaseURL}browse`

const getNewReleases = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    country: args.country,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${url}/new-releases`, { headers, params });
  return resp.data.albums;
};

const getFeaturedPlaylists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    country: args.country,
    locale: args.locale,
    timestamp: args.timestamp,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${url}/featured-playlists`, { headers, params });
  return resp.data.playlists;
};

const getBrowseCategory = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    country: args.country,
    locale: args.locale,
  };
  const resp = await axios.get(`${url}/categories/${args.category_id}`, { headers, params });
  return resp.data;
};

const getCategoryPlaylists = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    country: args.country,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${url}/categories/${args.category_id}/playlists`, { headers, params });
  return resp.data.playlists;
};

const getCategories = async function(args, req) {
  const headers = getAuthHeader(req);
  const params = {
    country: args.country,
    locale: args.locale,
    limit: args.limit,
    offset: args.offset,
  };
  const resp = await axios.get(`${url}/categories`, { headers, params });
  return resp.data.categories;
};

const getGenres = async function(args, req) {
  const headers = getAuthHeader(req);
  const resp = await axios.get(`${spotifyBaseURL}recommendations/available-genre-seeds`, { headers });
  return resp.data.genres;
};

module.exports = {
  browseNewReleases: getNewReleases,
  browseFeaturedPlaylists: getFeaturedPlaylists,
  browseCategoryPlaylists: getCategoryPlaylists,
  getCategory: getBrowseCategory,
  getCategories: getCategories,
  genres: getGenres
};
