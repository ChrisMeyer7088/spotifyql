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
    it('Should get a 400 error by not providing a required ID', async () => {
      const body = {
        query: `query {
          album() {
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
      expect(res.status).to.equal(400);
    });
    it('Should succeed but not retrieve an album with a non-existent or blank id', async () => {
      const body = {
        query: `query {
          album(id: "") {
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
      expect(res.body.data.album).to.be.null;
    });
  });
  context('Retrieve multiple albums by IDs', () => {
    it('Should retrieve a list of albums by valid IDs', async () => {
      const albumId = ['382ObEPsp2rxGrnsizN5TX','1A2GTWGtFfWp7KSQTwWOyo','2noRn2Aes5aoNVsU6iWThc']
      const body = {
        query: `query {
          albums(ids: "${albumId}") {
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
      const albums = res.body.data.albums;
      expect(albums.length).to.be.equal(3);
      for(let i = 0; i < albums.length; i++) {
        expect(albums[i].id).to.be.equal(albumId[i]);
      }
    });
    it('Should get a 400 error by not providing list of required IDs', async () => {
      const body = {
        query: `query {
          albums() {
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
      
      expect(res.status).to.equal(400);
    });
  });
  context('Retrieve multiple albums by IDs', () => {
    it('Should retrieve tracks from a valid album ID', async () => {
      const albumId = '382ObEPsp2rxGrnsizN5TX';
      const body = {
        query: `query {
          albumTracks(id: "${albumId}") {
            id
            name
            type
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
      const tracks = res.body.data.albumTracks;
      expect(tracks.length).to.greaterThan(0);
      expect(tracks[0].type).to.equal('track');
    });
    it('Should limit number of tracks to 2', async () => {
      const albumId = '382ObEPsp2rxGrnsizN5TX';
      const limit = 2;
      const body = {
        query: `query {
          albumTracks(id: "${albumId}", limit: ${limit}) {
            id
            name
            type
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
      const tracks = res.body.data.albumTracks;
      expect(tracks.length).to.equal(limit);
    });
    it('Should get a 400 error by not providing required ID', async () => {
      const body = {
        query: `query {
          albumTracks() {
            id
            name
            type
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
      
      expect(res.status).to.equal(400);
    });
  });
});
