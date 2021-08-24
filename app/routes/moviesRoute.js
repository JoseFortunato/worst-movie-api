'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/moviesController');

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

router.post('/:movieId/producers', controller.postProducer);
router.put('/:movieId/producers/:id', controller.putProducer);
router.delete('/:movieId/producers/:id', controller.deleteProducer);

module.exports = router;
