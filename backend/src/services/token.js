function getAuthHeader(req) {
  let token = req.headers.authorization;
  if (!token.includes('Bearer ')) {
    token = 'Bearer ' + token;
  }
  return {
    'Authorization': token
  };
}

module.exports = {
  getAuthHeader
}