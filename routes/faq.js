var express = require('express');
var router = express.Router();
var Faq = require('./../models/faq');

/* GET faq listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		data: {table:"faq", attributeData:Faq.attributeData},
		renderBody: "faq/index.ejs",
		renderEnd: "faq/grid.ejs"
	});
});

router.get('/list', function (req, res, next) {
	Faq.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});

router.delete('/:id', function (req, res, next) {
	Faq.destroy({
		where: {id: req.params.id}
	}).then(function (deletedOwner) {
		res.json(deletedOwner);
	});
});

router.get('/view/:id', function (req, res, next) {
	Faq.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model:model, attributeData: Faq.attributeData},
			renderBody: "faq/view.ejs"
		});
	});
});

router.get('/create', function (req, res, next) {
	res.render("layouts/main", {
		data: {model:Faq.newEmpty, attributeData: Faq.attributeData},
		renderBody: "faq/create.ejs"
	});
});

router.post('/create', function (req, res, next) {
	Faq.insertData(req.body).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		res.json(err);
	});
});

router.get('/update/:id', function (req, res, next) {
	Faq.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model: model, attributeData: Faq.attributeData},
			renderBody: "faq/update.ejs"
		});
	}).catch(function (error) {
		var data = {}
		data.status = 0; data.data = error;
		res.json(data);
	});
});

router.post('/update/:id', function (req, res, next) {
	var data = {};
	Faq.findById(req.params.id).then(function (model) {
		model.update(req.body, {where: {id: req.params.id}}).then(function (cb) {
			data.status = 1; data.data = cb
			res.json(data);
		}).catch(function (error) {
			data.status = 0;data.data = error;
			res.json(data);
		});
	}).catch(function (error) {
		data.status = 0; data.data = error;
		res.json(data);
		});
	});

module.exports = router;
