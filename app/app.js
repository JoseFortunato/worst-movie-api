'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ strict: false }));

const moviesRoute = require('./routes/moviesRoute');
const producersRoute = require('./routes/producersRoute');
const studiosRoute = require('./routes/studiosRoute');
const rankingRoute = require('./routes/rankingRoute');

app.use('/movies', moviesRoute);
app.use('/producers', producersRoute);
app.use('/studios', studiosRoute);
app.use('/ranking', rankingRoute);

module.exports = app;
