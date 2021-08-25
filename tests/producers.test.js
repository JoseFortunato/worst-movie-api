'use strict';

const request = require('supertest')
const app = require('../app/app.js');
let producerId = null;

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
    .get('/producers/1')
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
      producerId = response.body.producerId
      expect(response.statusCode).toEqual(201);
      done();
    });
  });

  it('Update a producer', (done) => {
    request(app)
    .put(`/producers/${producerId}`)
    .send({title: "Producer test 2"})
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('Delete a producer', (done) => {
    request(app)
    .delete(`/producers/${producerId}`)
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

});
