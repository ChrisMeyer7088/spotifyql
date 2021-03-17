const express = require('express')
const router = express.Router()
const { root, schema } = require('./graphql/graphql');
const { authorize } = require('./services/auth');
const { graphqlHTTP } = require('express-graphql');

router.get('/authorize', (req, res) => {
  const data = authorize();
  res.send(data)
});

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = router