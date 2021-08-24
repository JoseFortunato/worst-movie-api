'use strict';

const request = require('supertest')
const app = require('../index.js');

describe('GET /producers', () => {
  it('respond with json containing a list of all producers', (done) => {
    request(app)
    .get('/producers')
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('respond with json containing a producer', (done) => {
    request(app)
    .get('/producers/833')
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('Create a producer', (done) => {
    request(app)
    .post('/producers')
    .send({name: "Producer test"})
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(201);
      done();
    });
  });

  it('Update a producer', (done) => {
    request(app)
    .put('/producers/833')
    .send({title: "Producer test 2"})
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

});
