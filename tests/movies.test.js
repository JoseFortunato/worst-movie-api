'use strict';

/*
TODO - Implement tests for all endpoints
*/

const request = require('supertest')
const app = require('../app/app.js');
let movieId = null

describe('GET /movies', () => {
  it('respond with json containing a list of all movies', (done) => {
    request(app)
    .get('/movies')
    .query({ page: 1, limit: 5 })
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('respond with json containing a movie', (done) => {
    request(app)
    .get('/movies/1')
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('Create a movie', (done) => {
    request(app)
    .post('/movies')
    .send({title: "Movie test", year: 2020, winner: true, producers:[{producerId: 1}], studios:[{studioId: 1}]})
    .set('Accept', 'application/json')
    .then((response) => {
      movieId = response.body.movieId
      expect(response.statusCode).toEqual(201);
      done();
    });
  });

  it('Update a movie', (done) => {
    request(app)
    .put(`/movies/${movieId}`)
    .send({title: "Movie test 2", year: 2019})
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('Delete a movie', (done) => {
    request(app)
    .delete(`/movies/${movieId}`)
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

});
