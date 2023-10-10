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




const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log("File upload endpoint hit!");
  res.send('File uploaded!');
});

app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, './uploads', req.params.filename);
  if (!fs.existsSync(file)) {
    console.error('File not found:', req.params.filename);
    return res.status(404).send('File not found');
  }
  res.download(file);
});

app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, './uploads');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error fetching file list:', err);
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    res.json(files);
  });
});

app.delete('/delete/:filename', (req, res) => {
  const file = path.join(__dirname, './uploads', req.params.filename);
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
app.use('/compile', require('./routes/compile'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on http://192.168.50.223:${port}`);
});

module.exports = app;
