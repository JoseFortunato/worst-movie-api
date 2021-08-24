'use strict';

const { Studio } = require('../models');

exports.post = async (req, res, next) => {
  const create = await Studio.create(req.body, {
    validate: true
  });
  if (create) {
    res.status(201).send({studioId: create.dataValues.id, message: "Studio created."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to create studio."});
  }
};

exports.getAll = async (req, res, next) => {
  const studios = await Studio.findAll();
  res.status(200).send({statusCode: 200, data: studios});
};

exports.get = async (req, res, next) => {
  const studio = await Studio.findByPk(req.params.id);
  res.status(200).send({statusCode: 200, data: studio.dataValues});
};

exports.put = async (req, res, next) => {
  const update = await Studio.update(req.body, {
    where: {
      id: req.params.id
    },
    validate: true
  });

  if (update) {
    res.send({statusCode: 200, message: "Studio updated."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to update studio."});
  }
};

exports.delete = async (req, res, next) => {
  const result = await Studio.destroy({
    where: {
      id: req.params.id
    }
  });

  if (result) {
    res.send({statusCode: 200, message: "Studio deleted."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to delete studio."});
  }
};
