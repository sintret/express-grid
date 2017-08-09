var express = require('express');
var router = express.Router();
var model = require('./../models/bank.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    model.getGridFilter(req.query).then(function (items) {
        res.json(items);
    });
});

module.exports = router;