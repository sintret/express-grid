var express = require('express');
var router = express.Router();
var Company = require('./../models/company.js');

/* GET company listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		data: {table:"company"},
		renderBody: "company/index.ejs",
		renderEnd: "company/grid.ejs"
	});
});
router.get('/list', function (req, res, next) {
	Company.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});
router.delete('/:id', function (req, res, next) {
	Company.destroy({
		where: {id: req.params.id}
	}).then(function (deletedOwner) {
		res.json(deletedOwner);
	});
});
router.get('/view/:id', function (req, res, next) {
	Company.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model:model},
			renderBody: "company/view.ejs"
		});
	});
});
module.exports = router;
