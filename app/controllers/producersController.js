'use strict';

/*
TODO - Test values in post and put methods
TODO - Validate query params where
*/

const { Producer } = require('../models');

exports.post = async (req, res, next) => {
  try {
    const create = await Producer.create(req.body, {
      validate: true
    });

    if (create) {
      res.status(201).send({producerId: create.dataValues.id, message: "Producer created."});
    }
    else {
      res.status(400).send({message: "Failed to create producer."});
    }
  }
  catch (e) {
    res.status(400).send({message: "Failed to create producer."});
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const producers = await Producer.findAll();

    if (producers) {
      res.status(200).send(producers);
    }
    else {
      res.status(400).send({message: "Failed to get producers."});
    }
  }
  catch (e) {
    res.status(400).send({message: "Failed to get producers."});
  }
};

exports.get = async (req, res, next) => {
  try {
    const producer = await Producer.findByPk(req.params.id);

    if (producer) {
      res.status(200).send(producer.dataValues);
    }
    else {
      res.status(400).send({message: "Failed to get a producer."});
    }
  }
  catch (e) {
    res.status(400).send({message: "Failed to get a producer."});
  }
};

exports.put = async (req, res, next) => {
  try {
    const update = await Producer.update(req.body, {
      where: {
        id: req.params.id
      },
      validate: true
    });
    if (update) {
      res.status(200).send({message: "Producer updated."});
    }
    else {
      res.status(400).send({message: "Failed to update producer."});
    }
  }
  catch (e) {
    res.status(400).send({message: "Failed to update producer."});
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await Producer.destroy({
      where: {
        id: req.params.id
      }
    });

    if (result) {
      res.status(200).send({message: "Producer deleted."});
    }
    else {
      res.status(400).send({message: "Failed to delete producer."});
    }
  }
  catch (e) {
    res.status(400).send({message: "Failed to delete producer."});
  }
};
