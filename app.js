const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cfg = require('./cfg/db');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

MongoClient.connect(cfg.url, (err, database) => {
  if (err) console.log(err);
  const db = database.db(cfg.dbName);

  require('./routes/users')(app, db);

  app.listen(process.env.PORT || 3002, () => {
    console.log('Server started on port ' + 3002);
  });
});

module.exports = app;
