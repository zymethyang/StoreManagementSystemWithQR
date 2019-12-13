var express = require('express');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);


module.exports = app;
