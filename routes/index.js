var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    isGame: true,
    encodedJson: encodeURIComponent(JSON.stringify(req.user))
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    encodedJson: encodeURIComponent(JSON.stringify(req.user))
  });
});

module.exports = router;
