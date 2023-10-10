const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const router = express.Router();
const env = require('./environment');

const TEMP_PATH = env.TEMP_PATH;

router.post('/', (req, res) => {
  console.log(req.body);  // Log the received body
  const code = req.body.code;

  const dir = `${TEMP_PATH}`;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  const filename = 'TempClass';
  fs.writeFileSync(path.join(dir, `${filename}.java`), code);

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
