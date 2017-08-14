var express = require('express');
var router = express.Router();
var Department = require('./../models/department.js');

/* GET department listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		renderBody: "department/index.ejs",
		renderEnd: "department/grid.ejs",
		data: {table:"department"}
	});
});
router.get('/list', function (req, res, next) {
	Department.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});
router.delete('/:id', function (req, res, next) {
	Department.destroy({
		where: {id: req.params.id}
	}).then(function (deletedOwner) {
		res.json(deletedOwner);
	});
});
router.get('/view/:id', function (req, res, next) {
	Department.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model:model},
			renderBody: "department/view.ejs"
		});
	});

});
module.exports = router;
