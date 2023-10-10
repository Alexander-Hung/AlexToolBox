var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');

var cors = require('cors');

router.use(cors());
router.use(cors({
  origin: 'http://76.93.217.172:4200',
  allowedHeaders: ['Content-Type', 'Authorization', /* other headers */],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


const storage = multer.diskStorage({
  destination: '../uploads/',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const directoryPath = path.join(__dirname, '../uploads/'); // replace 'YOUR_DIRECTORY_NAME' with the actual directory

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
router.post('/upload', upload.single('file'), (req, res) => {
  console.log("File upload endpoint hit!");
  res.send('File uploaded!');
});

// Download Endpoint
router.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);

  if (!fs.existsSync(file)) {
    console.error('File not found:', req.params.filename);
    return res.status(404).send('File not found');
  }

  res.download(file);
});

// File Listing Endpoint
router.get('/files', (req, res) => {
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
router.delete('/delete/:filename', (req, res) => {
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

module.exports = router;