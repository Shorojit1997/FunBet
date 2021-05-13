const express = require('express')
const morgan = require('morgan');
const body_parser = require('body-parser')
const session = require('express-session');
var compression = require('compression')
const cors = require('cors')
const path = require('path')
var MongoDBStore = require('connect-mongodb-session')(session);

const localhostUrl = 'mongodb://localhost/betingapp';
let store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'mySessionsDatabaSe',
  expires: 1000 * 60 * 60 * 12*7,
});

const publicPath = path.join(__dirname, 'public');
const middleware = [
  morgan('dev'),
  cors(),
  express.json(),
  express.urlencoded({ extended: false, }),
  express.static('public'),
  body_parser.urlencoded({ extended: false }),
  compression(),
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12*7,
      // secure: true,
    },
    store: store,
  }),
]

module.exports = middleware;