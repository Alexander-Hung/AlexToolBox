const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(cors({
  origin: 'http://76.93.217.172:4200',
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/fileshare', require('./routes/file-share'));
app.use('/compile', require('./routes/compile'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on http://192.168.50.223:${port}`);
});

module.exports = app;
