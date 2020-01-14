const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cfg = require('./cfg/db');

const app = express();

const userRoutes = require('./routes/users');
const filmRoutes = require('./routes/films');

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/users', userRoutes);
app.use('/films', filmRoutes);

mongoose.Promise = global.Promise;

mongoose.connect(cfg.url, {useNewUrlParser: true}).then(() => {
  console.log('Connected Successful');
  app.listen(process.env.PORT || 3002, () => {
    console.log('Server started on port ' + 3002);
  });
}, err => {
  throw err;
});

module.exports = app;
