var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const { exec } = require('child_process');
const env = require('./environment.js');

const TEMP_PATH = env.TEMP_PATH;

var cors = require('cors');
const fs = require('fs');
const path = require('path');

router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/compile', (req, res) => {
  console.log(req.body);  // Log the received body
  const code = req.body.code;

  const dir = TEMP_PATH;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  // Save the code to a temporary .java file
  const filename = 'TempClass';
  fs.writeFileSync(path.join(dir, `${filename}.java`), code);

  // Compile and run the Java code
  exec(`javac ${TEMP_PATH}/${filename}.java && java -cp ${TEMP_PATH} ${filename}`, (error, stdout, stderr) => {
    if (error) {
      return res.json({
        success: false,
        output: stderr,
      });
    }
    res.json({
      success: true,
      output: stdout,
    });
  });
});

module.exports = router;