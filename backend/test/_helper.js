const app = require('../src/server');
const chai = require('chai');
const chaiHTTP = require('chai-http');
require('dotenv').config();

chai.use(chaiHTTP);

const retrieveAccessToken = async () => {
  console.log('Client ID: ', process.env.CLIENT_ID)
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };
  const res = await chai.request(app)
    .post('/token')
    .send(body);
  return res.body.access_token;
}

module.exports = {
  retrieveAccessToken
}
