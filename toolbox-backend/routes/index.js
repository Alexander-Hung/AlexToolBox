var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tools', function(req, res, next) {
  res.json({ tools: ["calculator", "file-share", "compile"] });
});

module.exports = router;
