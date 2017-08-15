var express = require('express');
var router = express.Router();
var Bank = require('./../models/bank.js');

/* GET bank listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		data: {table:"bank"},
		renderBody: "bank/index.ejs",
		renderEnd: "bank/grid.ejs"
	});
});
router.get('/list', function (req, res, next) {
	Bank.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});
router.delete('/:id', function (req, res, next) {
	Bank.destroy({
		where: {id: req.params.id}
	}).then(function (deletedOwner) {
		res.json(deletedOwner);
	});
});
router.get('/view/:id', function (req, res, next) {
	Bank.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model:model},
			renderBody: "bank/view.ejs"
		});
	});
});
router.get('/create', function (req, res, next) {
	res.render("layouts/main", {
		data: {model:Bank.attributeData},
		renderBody: "bank/create.ejs"
	});
});
router.post('/create', function (req, res, next) {
	Bank.insertData(req.body).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		res.json(err);
	});
});
router.get('/update', function (req, res, next) {
	res.render("layouts/main", {
		data: {model:Bank.attributeData},
		renderBody: "bank/update.ejs"
	});
});
module.exports = router;
