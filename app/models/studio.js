'use strict';

module.exports = (sequelize, DataTypes) => {
  const Studio = sequelize.define('Studio', {
    name: DataTypes.STRING,
  });

  Studio.associate = (models) => {
    Studio.belongsToMany(models.Movie, {through: 'StudiosMovies', foreignKey: 'studioId', as: 'studios'})
  };

  return Studio;
}
