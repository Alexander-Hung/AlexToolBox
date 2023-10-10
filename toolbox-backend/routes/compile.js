const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);  // Log the received body
  const code = req.body.code;

  const dir = './temp';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  const filename = 'TempClass';
  fs.writeFileSync(path.join(dir, `${filename}.java`), code);

  exec(`javac ./temp/${filename}.java && java -cp ./temp ${filename}`, (error, stdout, stderr) => {
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
