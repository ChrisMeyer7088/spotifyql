function getAuthHeader(req) {
  let token = req.headers.authorization;
  if (!token.includes('Bearer ')) {
    token = 'Bearer ' + 'BQDTR1Cp70w0IIIF7XOaypGm_GIDV9IYnK4BO4Af-hLubj--NEOZU8U-QuY_gFSSyJUeBvgFN_t-vTMYcTEOltAnEigkqYalWd5aVVUw_XR0yAE2CWFOl4PP7c7MaHXjB3L7bYL2_24_bbsKjlCzVrKxgeiPlOvQboRVgcE98uRzffc7leLcGVzH9WD23LUCsnM8yQeCyhsErpCAgJfFwXSUKMyB0mpN_yEyoXVWGuUibR9f5g9g7EXJL0k-fQxqfQ';
  }
  return {
    'Authorization': token
  };
}

module.exports = {
  getAuthHeader
}
