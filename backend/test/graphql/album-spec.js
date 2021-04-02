var assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const app = require('../../src/server');
const { retrieveAccessToken } = require('../_helper');

chai.use(chaiHTTP);

let access_token = '';
beforeEach(async() => {
  access_token = await retrieveAccessToken()
})

describe('#queries-album', () => {
  context('Retrieves album by ID', () => {
    it('Should retrieve an album by a valid ID', async () => {
      const albumId = '4aawyAB9vmqN3uQ7FjRGTy'
      const body = {
        query: `query {
          album(id: "${albumId}") {
            id
            name
            artists {
              name
            }
          }
        }`
      };

      const res = await chai.request(app)
        .post('/graphql')
        .set('Authorization', access_token)
        .send(body);
      expect(res.status).to.equal(200);
      const { name, id } = res.body.data.album;
      expect(id).to.equal(albumId)
    });
  });
});
