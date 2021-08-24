'use strict';

module.exports = (sequelize, DataTypes) => {
  const MovieProducer = sequelize.define('MoviesProducer', {
    movieId: DataTypes.INTEGER,
    producerId: DataTypes.INTEGER,
  });

  MovieProducer.associate = (models) => {
    MovieProducer.belongsToMany(models.Movie, {through: 'Movies', foreignKey: 'movieId', as: 'producers'})
  };

  return MovieProducer;
}
