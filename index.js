'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ strict: false }));

const moviesRoute = require('./app/routes/moviesRoute');
const producersRoute = require('./app/routes/producersRoute');
const studiosRoute = require('./app/routes/studiosRoute');
const rankingRoute = require('./app/routes/rankingRoute');

app.use('/movies', moviesRoute);
app.use('/producers', producersRoute);
app.use('/studios', studiosRoute);
app.use('/ranking', rankingRoute);

module.exports = app;

// app.listen(3000, () => {
//   console.log(`app listening on port 3000`)
// })
