var express = require('express');
var router = express.Router();
var User = require('./../models/user.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
   User.getGridFilter(req.query).then(function (items) {
        res.json(items);
    });
});

module.exports = router;
