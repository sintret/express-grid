var express = require('express');
var router = express.Router();
var Member = require('./../models/member.js');

/* GET member listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		renderBody: "member/index.ejs",
		renderEnd: "member/grid.ejs",
		data: {table:"member"}
	});
});
router.get('/list', function (req, res, next) {
	Member.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});
module.exports = router;
