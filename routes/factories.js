var express = require('express');
var router = express.Router();
var Factories = require('./../models/factories.js');

/* GET factories listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		renderBody: "factories/index.ejs",
		renderEnd: "factories/grid.ejs",
		data: {table:"factories"}
	});
});
router.get('/list', function (req, res, next) {
	Factories.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});
module.exports = router;
