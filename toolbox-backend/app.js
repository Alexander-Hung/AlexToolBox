const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');//remove if not working
const multer = require('multer');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const env = require('./routes/environment');

const IP = env.IP;
const UPLOAD_PATH = env.UPLOAD_PATH;

var app = express();
const port = 5000;

const privateKey = fs.readFileSync(`${env.KEY_PATH}`, 'utf8');  //remove if not working
const certificate = fs.readFileSync(`${env.CER_PATH}`, 'utf8'); //remove if not working
const ca = fs.readFileSync(`${env.CA_PATH}`, 'utf8'); //remove if not working

const credentials = { //remove if not working
  key: privateKey,//remove if not working
  cert: certificate,//remove if not working
  ca: ca, // Optional, if you have the CA bundle//remove if not working
};//remove if not working

const httpsServer = https.createServer(credentials, app);//remove if not working


// Middleware
app.use(cors());
app.use(cors({
  origin: `${IP}`,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
}));



//files-share
const storage = multer.diskStorage({
  destination: `${UPLOAD_PATH}`,
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log("File upload endpoint hit!");
  res.json({ message: 'File uploaded!' });
});

app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, `${UPLOAD_PATH}`, req.params.filename);
  if (!fs.existsSync(file)) {
    console.error('File not found:', req.params.filename);
    return res.status(404).send('File not found');
  }
  res.download(file);
});

app.get('/files', (req, res) => {
  const directoryPath = path.join(__dirname, `${UPLOAD_PATH}`);
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error fetching file list:', err);
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    res.json(files);
  });
});

app.delete('/delete/:filename', (req, res) => {
  const file = path.join(__dirname, `${UPLOAD_PATH}`, req.params.filename);
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

//why-fires
app.get('/why-fires', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'why-fires.html'));
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
app.use('/why-fires', require('./routes/why-fires'));

httpsServer.listen(port, '0.0.0.0', () => { //app.listen(port, '0.0.0.0'
  console.log(`Server started on ${port}`);
});

module.exports = app;
