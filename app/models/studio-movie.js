'use strict';

module.exports = (sequelize, DataTypes) => {
  const StudioMovie = sequelize.define('StudiosMovie', {
    studioId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
  });

  StudioMovie.associate = (models) => {
    StudioMovie.belongsToMany(models.Movie, {through: 'Movies', foreignKey: 'movieId', as: 'studios'})
  };

  return StudioMovie;
}
