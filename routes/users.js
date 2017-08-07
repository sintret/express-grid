var express = require('express');
var router = express.Router();
var User = require('./../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  User.getGridFilter(req.query).then(function (items) {
    res.json(items);
  })
  /*db.find(getClientFilter(req.query), function(err, items) {
    res.json(items);
  });*/
});

module.exports = router;
