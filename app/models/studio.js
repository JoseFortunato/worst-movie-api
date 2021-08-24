'use strict';

module.exports = (sequelize, DataTypes) => {
  const Studio = sequelize.define('Studio', {
    name: DataTypes.STRING,
  });

  return Studio;
}
