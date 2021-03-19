const express = require('express');
const router = express.Router();
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers/root');
const { graphqlHTTP } = require('express-graphql');

const tokenValidator = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400);
    res.send('Header Authorization missing;\nSpotify Access Token must be provided to access queries.');
    return;
  }
  next();
}

router.use('/', [tokenValidator, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})]);

module.exports = router;