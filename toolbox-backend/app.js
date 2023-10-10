const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const path = require('path');

var compileRouter = require('./routes/compile');
var fileShareRouter = require('./routes/file-share');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var env = require('./routes/environment.js');

const IP = env.IP;
var app = express();
const port = 5000;
var cors = require('cors');

app.use(cors());
app.use(cors({
  origin: `${IP}`,
  allowedHeaders: ['Content-Type', 'Authorization', /* other headers */],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow these headers
  next();
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on ${IP}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fileshare', fileShareRouter);
app.use('/compile', compileRouter);

module.exports = app;
