'use strict';

const { Producer } = require('../models');

exports.post = async (req, res, next) => {
  const create = await Producer.create(req.body, {
    validate: true
  });
  if (create) {
    res.status(201).send({producerId: create.dataValues.id, message: "Producer created."});
  }
  else {
    res.status(400).send({message: "Failed to create producer."});
  }
};

exports.getAll = async (req, res, next) => {
  const producers = await Producer.findAll();
  res.status(200).send({statusCode: 200, data: producers});
};

exports.get = async (req, res, next) => {
  const producer = await Producer.findByPk(req.params.id);
  res.status(200).send({statusCode: 200, data: producer.dataValues});
};

exports.put = async (req, res, next) => {
  const update = await Producer.update(req.body, {
    where: {
      id: req.params.id
    },
    validate: true
  });
  if (update) {
    res.send({statusCode: 200, message: "Producer updated."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to update producer."});
  }
};

exports.delete = async (req, res, next) => {
  const result = await Producer.destroy({
    where: {
      id: req.params.id
    }
  });

  if (result) {
    res.send({statusCode: 200, message: "Producer deleted."});
  }
  else {
    res.status(400).send({statusCode: 400, message: "Failed to delete producer."});
  }
};
