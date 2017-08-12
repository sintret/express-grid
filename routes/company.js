var express = require('express');
var router = express.Router();
var Company = require('./../models/company.js');

router.get('/', function (req, res, next) {
    res.render("layouts/main", {
        renderBody: "company/index.ejs",
        renderEnd: "company/grid.ejs",
        data: {}
    });
});
/* GET companies listing. */
router.get('/list', function (req, res, next) {
    Company.getGridFilter(req.query).then(function (items) {
        res.json(items);
    });
});
module.exports = router;
