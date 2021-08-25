'use strict';

/*
TODO - Test values in post and put methods
TODO - Validate query params where
*/

const { Movie, MoviesProducer, StudiosMovie } = require('../models');

exports.post = async (req, res, next) => {
  if (!req.body.producers || !req.body.studios) {
    return res.status(400).send({message: "You need at least one producer and a studio to register a new movie."});
  }

  try {
    const create = await Movie.create(req.body, {
      include: ['studios', 'producers'],
      validate: true
    });

    if (create) {
      return res.status(201).send({movieId: create.dataValues.id, message: "Movie created."});
    }
    else {
      return res.status(400).send({message: "Failed to create a movie."});
    }
  } catch (e) {
    return res.status(400).send({message: "Failed to create a movie."});
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      where: (req.query.where) ? JSON.parse(req.query.where) : {},
      offset: (req.query.page) ? req.query.page : 0,
      limit: (req.query.size) ? req.query.size : 10,
      include: ['studios', 'producers']
    });

    if (movies) {
      res.status(200).send(movies);
    }
    else {
      return res.status(400).send({message: "Failed to get movies."});
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({message: "Failed to get movies."});
  }
};

exports.get = async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: ['studios', 'producers']
    });

    if (movie) {
      res.status(200).send(movie.dataValues);
    }
    else {
      res.status(400).send({message: "Failed to find a movie."});
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({message: "Failed to find a movie."});
  }
};

exports.put = async (req, res, next) => {
  try {
    const update = await Movie.update(req.body, {
      where: {
        id: parseInt(req.params.id)
      },
    });

    if (update) {
      res.status(200).send({message: "Movie updated."});
    }
    else {
      res.status(400).send({message: "Failed to update movie."});
    }
  } catch (e) {
    res.status(400).send({message: "Failed to update a movie."});
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await Movie.destroy({
      where: {
        id: req.params.id
      },
      include: ['studios', 'producers']
    });

    if (result) {
      res.send({statusCode: 200, message: "Movie deleted."});
    }
    else {
      res.status(400).send({message: "Failed to delete movie."});
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({message: "Failed to delete movie."});
  }
};

exports.postProducer = async (req, res, next) => {
  const create = await MoviesProducer.create(req.body);

  if (create) {
    res.status(200).send({statusCode: 200, message: "Producer added to a movie."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to add prodotucer to amovie."});
  }
};

exports.putProducer = async (req, res, next) => {
  const update = await MoviesProducer.update(req.body, {
    where: {
      id: req.params.id,
      movieId: req.params.movieId
    },
  });
  if (update) {
    res.status(200).send({statusCode: 200, message: "Producer updated."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to update producer."});
  }
};

exports.deleteProducer = async (req, res, next) => {
  const result = await MoviesProducer.destroy({
    where: {
      id: req.params.id,
      movieId: req.params.movieId
    }
  });

  if (result) {
    res.send({statusCode: 200, message: "Producer remove from movie."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to remove producer from movie."});
  }
};

exports.postStudio = async (req, res, next) => {
  const create = await StudiosMovie.create(req.body);

  if (create) {
    res.status(200).send({statusCode: 200, message: "Studio added to a movie."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to add studio to amovie."});
  }
};

exports.putStudio = async (req, res, next) => {
  const update = await StudiosMovie.update(req.body, {
    where: {
      id: req.params.id,
      movieId: req.params.movieId
    },
  });
  if (update) {
    res.status(200).send({statusCode: 200, message: "Studio updated."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to update studio."});
  }
};

exports.deleteStudio = async (req, res, next) => {
  const result = await StudiosMovie.destroy({
    where: {
      id: req.params.id,
      movieId: req.params.movieId
    }
  });

  if (result) {
    res.send({statusCode: 200, message: "Studio remove from movie."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to remove studio from movie."});
  }
};
