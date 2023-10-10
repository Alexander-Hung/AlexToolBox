const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var compileRouter = require('./routes/compile');
var fileShareRouter = require('./routes/file-share');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 5000;
var cors = require('cors');

app.use(cors());
app.use(cors({
  origin: 'http://76.93.217.172:4200',
  allowedHeaders: ['Content-Type', 'Authorization', /* other headers */],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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


// Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  console.log("File upload endpoint hit!");
  res.send('File uploaded!');
});

// Download Endpoint
app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);

  if (!fs.existsSync(file)) {
    console.error('File not found:', req.params.filename);
    return res.status(404).send('File not found');
  }

  res.download(file);
});

// File Listing Endpoint
app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error fetching file list:', err);
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    res.json(files);
  });
});

// Delete Endpoint
app.delete('/delete/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);

  if (!fs.existsSync(file)) {
    console.error('File not found:', req.params.filename);
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


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow these headers
  next();
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on http://192.168.50.223:${port}`);
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
