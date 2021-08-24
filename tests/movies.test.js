'use strict';

const request = require('supertest')
const app = require('../index.js');

describe('GET /movies', () => {
  it('respond with json containing a list of all movies', (done) => {
    request(app)
    .get('/movies')
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('respond with json containing a movie', (done) => {
    request(app)
    .get('/movies/212')
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('Create a movie', (done) => {
    request(app)
    .post('/movies')
    .send({title: "Movie test", year: 2020, winner: true, producers:[{producerId: 833}], studios:[{studioId: 140}]})
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(201);
      done();
    });
  });

  it('Update a movie', (done) => {
    request(app)
    .put('/movies/212')
    .send({title: "Movie test 2", year: 2019})
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

});
