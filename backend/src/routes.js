const express = require('express');
const router = express.Router();
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers/root');
const { graphqlHTTP } = require('express-graphql');
const { validateToken, validateClientCredParams } = require('./services/validators')
const axios = require('axios').default;

router.use('/graphql', [validateToken, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})]);

/**
 * Returns an access token for client based on spotify's client credential flow
 * https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
 */
router.post('/token', [validateClientCredParams, async (req, res) => {
  const { client_id, client_secret } = req.body;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials')

  const headers = {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  try {
    const resp = await axios.post('https://accounts.spotify.com/api/token', params, { headers });
    res.status(200).send(resp.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error has occured retireving token please try again or report this issue at:\n" +
        "https://github.com/ChrisMeyer7088/spotifyql/issues");
  }
}])

module.exports = router;
