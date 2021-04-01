const validateToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400);
    res.send('Header Authorization missing;\nSpotify Access Token must be provided to access queries.');
    return;
  }
  next();
};

const validateClientCredParams = (req, res, next) => {
  if (!req.body.client_secret || !req.body.client_id) {
    res.status(400);
    res.send("Client secret and client id are required to retrieve access token.");
    return;
  }
  next();
};

module.exports = {
  validateToken,
  validateClientCredParams,
};
