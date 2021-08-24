'use strict';

module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define('Producer', {
    name: DataTypes.STRING,
  });

  return Producer;
}
