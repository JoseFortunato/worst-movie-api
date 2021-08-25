'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('StudiosMovies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      studioId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Studios',
          key: 'id'
        }
      },
      movieId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Movies',
          key: 'id'
        },
        onDelete: 'cascade'
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
    return queryInterface.dropTable('StudiosMovies');
  }
};
