# worst-movie-api

RESTful API for reading the list of nominees and winners in the Worst Film category at the Golden Raspberry Awards.
This api use node version: v14.16.1

First install the dependecies

    npm install

To start and pupulate database:

    npx sequelize db:migrate
    npm run seed

To run tests:

    npm run tests

To run server:

    npm start
