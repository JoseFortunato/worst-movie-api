'use strict';

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    winner: DataTypes.BOOLEAN,
  });

  Movie.associate = (models) => {
    Movie.hasMany(models.StudiosMovie, {as: 'studios'})
    Movie.hasMany(models.MoviesProducer, {as: 'producers'})
  };

  return Movie;
}
