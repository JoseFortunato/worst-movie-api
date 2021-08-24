'use strict';
// TODO: Não permitir registros duplicados

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('MoviesProducers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      movieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Movies',
          key: 'id'
        }
      },
      producerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Producers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('MoviesProducers');
  }
};
