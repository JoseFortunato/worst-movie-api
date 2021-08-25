'use strict';

/*
TODO - Refactor how the name of producers is searched
*/

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    },
    winner: DataTypes.BOOLEAN,
  },{
    hooks: {
      afterFind: async (movies, options) => {
        for (const n in movies) {
          if (movies[n].dataValues) {
            for (const i in movies[n].dataValues.producers) {
              const producer = await sequelize.models.Producer.findByPk(movies[n].dataValues.producers[i].dataValues.producerId);
              movies[n].dataValues.producers[i].dataValues.producer = producer.dataValues.name;
            }
          }
          else if(movies[n].producers) {
            for (const i in movies[n].producers) {
              const producer = await sequelize.models.Producer.findByPk(movies[n].producers[i].dataValues.producerId);
              movies[n].producers[i].dataValues.producer = producer.dataValues.name;
            }
          }
        }
        return movies;
      },
    }
  });

  Movie.associate = (models) => {
    Movie.hasMany(models.StudiosMovie, {as: 'studios', onDelete: 'cascade', hooks: true})
    Movie.hasMany(models.MoviesProducer, {as: 'producers', onDelete: 'cascade', hooks: true})
  };

  return Movie;
}
