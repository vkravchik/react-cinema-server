const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cfg = require('./cfg/db');

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(cfg.url, {useNewUrlParser: true}).then(() => {
  console.log('Connected Successful');
}, err => {
  throw err;
});

// MongoClient.connect(cfg.url, (err, database) => {
//   if (err) console.log(err);
//   const db = database.db(cfg.dbName);
//
//   require('./routes/users')(app, db);
//   require('./routes/films')(app, db);
//
//   app.listen(process.env.PORT || 3002, () => {
//     console.log('Server started on port ' + 3002);
//   });
// });

module.exports = app;
