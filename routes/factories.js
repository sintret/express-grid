var express = require('express');
var router = express.Router();
var Factories = require('./../models/factories.js');

/* GET factories listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		data: {table:"factories"},
		renderBody: "factories/index.ejs",
		renderEnd: "factories/grid.ejs"
	});
});
router.get('/list', function (req, res, next) {
	Factories.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});
router.delete('/:id', function (req, res, next) {
	Factories.destroy({
		where: {id: req.params.id}
	}).then(function (deletedOwner) {
		res.json(deletedOwner);
	});
});
router.get('/view/:id', function (req, res, next) {
	Factories.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model:model},
			renderBody: "factories/view.ejs"
		});
	});
});
router.get('/create', function (req, res, next) {
	res.render("layouts/main", {
		data: {model:Factories.attributeData},
		renderBody: "factories/form.ejs"
	});
});
module.exports = router;
