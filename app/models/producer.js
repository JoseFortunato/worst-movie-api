'use strict';

module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define('Producer', {
    name: DataTypes.STRING,
  });

  Producer.associate = (models) => {
    Producer.belongsToMany(models.MoviesProducer, {through: 'MoviesProducers', foreignKey: 'producerId', as: 'producersName'})
  };

  return Producer;
}
