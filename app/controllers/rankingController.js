'use strict';

/*
TODO - Implement query params by years
*/

const { Movie } = require('../models');

const ranking = (movies) => {

  let winners = [];

  for (const movie of movies) {
    for (const producer of movie.producers) {
      if (winners[producer.dataValues.producerId]) {
        winners[producer.dataValues.producerId].interval = movie.year - winners[producer.dataValues.producerId].followingWin;
        winners[producer.dataValues.producerId].previousWin = winners[producer.dataValues.producerId].followingWin;
        winners[producer.dataValues.producerId].followingWin = movie.year;
      }
      else {
        winners[parseInt(producer.dataValues.producerId)] = {
          producer: producer.dataValues.producer,
          interval: null,
          previousWin: null,
          followingWin: movie.year
        }
      }
    }
  }

  winners = winners.filter(winner => winner.interval).sort((a, b) => {
    return a.interval - b.interval;
  });

  const min = winners.filter(winner => winner.interval === winners[0].interval);
  const max = winners.filter(winner => winner.interval === winners[winners.length - 1].interval);

  return {
    min: min,
    max: max
  }
}

exports.get = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      where: {
        winner: true
      },
      order: [['year', 'ASC']],
      include: ['producers']
    });

    if (movies) {
      res.status(200).send(ranking(movies));
    }
    else {
      res.status(400).send({message: "Failed to find a movie."});
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({message: "Failed to find a movie."});
  }
};
