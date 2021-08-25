'use strict';

/*
TODO - Test values in post and put methods
TODO - Validate query params where
*/

const { Studio } = require('../models');

exports.post = async (req, res, next) => {
  try {
    const create = await Studio.create(req.body, {
      validate: true
    });

    if (create) {
      res.status(201).send({studioId: create.dataValues.id, message: "Studio created."});
    }
    else {
      res.status(400).send({message: "Failed to create studio."});
    }
  } catch (e) {
    res.status(400).send({message: "Failed to create studio."});
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const studios = await Studio.findAll();

    if (studios) {
      res.status(200).send(studios);
    }
    else {
      res.status(400).send({message: "Failed to get studios."});
    }
  } catch (e) {
    res.status(400).send({message: "Failed to get studios."});
  }
};

exports.get = async (req, res, next) => {
  try {
    const studio = await Studio.findByPk(req.params.id);

    if (studio) {
      res.status(200).send(studio.dataValues);
    }
    else {
      res.status(400).send({message: "Failed to get studio."});
    }
  } catch (e) {
    res.status(400).send({message: "Failed to get studio."});
  }
};

exports.put = async (req, res, next) => {
  try {
    const update = await Studio.update(req.body, {
      where: {
        id: req.params.id
      },
      validate: true
    });

    if (update) {
      res.send({message: "Studio updated."});
    }
    else {
      res.status(400).send({message: "Failed to updated studio."});
    }
  } catch (e) {
    res.status(400).send({message: "Failed to updated studio."});
  }
};

exports.delete = async (req, res, next) => {
  try {
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
  } catch (e) {
    res.status(400).send({message: "Failed to delete studio."});
  }
};
