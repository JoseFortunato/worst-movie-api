'use strict';

const csv = require('csv-parser')
const fs = require('fs')
const { Movie, Producer, Studio } = require('./../../app/models');

const movies = [];
const producerList = [];
const studiosList = [];

const getProducers = async (producers) => {

  if (producers.includes(', and ')) {
    producers = producers.replace(', and ', ',');
  }

  if (producers.includes(',')) {
    producers = producers.split(',');
    for (const i in producers) {
      if (producers[i].includes(' and ')) {
        producers = producers.concat(producers[i].split(' and '));
        producers.splice(i, 1);
      }
    }
  }
  else if (producers.includes(' and ')) {
    producers = producers.split(' and ');
  }
  else {
    producers = producers.split(',');
  }

  const producerId = [];
  for (const producer of producers) {
    if (!producerList[producer.trim()]) {
      const create = await Producer.create(
        {
          name: producer.trim()
        },
        {
          validate: true
        }
      );
      producerList[producer.trim()] = create.dataValues.id;
      producerId.push({producerId: create.dataValues.id});
    }
    else {
      producerId.push({producerId: producerList[producer.trim()]});
    }
  }

  return producerId;

}

const getStudios = async (studios) => {

  studios = studios.split(',');

  const studiosId = [];
  for (const studio of studios) {
    if (!studiosList[studio.trim()]) {
      const create = await Studio.create(
        {
          name: studio.trim()
        },
        {
          validate: true
        }
      );
      studiosList[studio.trim()] = create.dataValues.id;
      studiosId.push({studioId: create.dataValues.id});
    }
    else {
      studiosId.push({studioId: studiosList[studio.trim()]});
    }
  }

  return studiosId;

}

if (!fs.existsSync(process.env.npm_config_file)) {
  console.error('File not found.');
  process.exit();
}

fs.createReadStream(process.env.npm_config_file)
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => movies.push(data))
  .on('end', async () => {

    for (const movie of movies) {
      const movieDB = {
        "title": movie.title,
        "year": movie.year,
        "winner": (movie.winner ===  "yes") ? true : false,
        "producers": await getProducers(movie.producers),
        "studios": await getStudios(movie.studios)
      }
      console.log(movieDB);
      const create = await Movie.create(movieDB, {
        include: ['studios', 'producers'],
        validate: true
      });


    }
  });
