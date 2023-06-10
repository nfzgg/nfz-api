var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NFZ Transferable Utilities' });
});

/* GET home page. */
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'NFZ Demo' });
});

module.exports = router;
