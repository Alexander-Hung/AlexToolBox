const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 3000;
var cors = require('cors');
const corsOptions = {
  origin: 'http://76.93.217.172:4200',
  optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const directoryPath = path.join(__dirname, './uploads/'); // replace 'YOUR_DIRECTORY_NAME' with the actual directory

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  // Listing all files
  files.forEach(function (file) {
    console.log(file);
  });
});
app.post('/upload', upload.single('file'), (req, res) => {
  console.log("File upload endpoint hit!");
  res.send('File uploaded!');
});

app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);
  res.download(file);
});

app.use(cors()); // To solve CORS issues

app.get('/files', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    res.json(files);
  });
});

app.delete('/delete/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);

  if (!fs.existsSync(file)) {
    return res.status(404).send('File not found');
  }

  fs.unlink(file, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).send('Error deleting file');
    }
    res.send('File deleted successfully');
  });
});

app.listen(3000, '127.0.0.1',onServerListening);

app.use(cors({
  origin: 'http://http://76.93.217.172:4200',
  allowedHeaders: ['Content-Type', 'Authorization', /* other headers */],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow these headers
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
