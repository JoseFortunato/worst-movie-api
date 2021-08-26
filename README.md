# worst-movie-api

RESTful API for reading the list of nominees and winners in the Worst Film category at the Golden Raspberry Awards.
This api use node: v14.16.1
In the files folder there is an Insomnia file with all routes and examples of requests.

#Build Setup

```bash
# Install the dependecies
$ npm install

# Create database file:
$ npx sequelize db:migrate

# Pupulate database passing the csv with movies:
$ npm run seed --file="./database/seeders/movielist.csv"

# Run tests:
$ npm run tests

# Run server:
$ npm start
```
