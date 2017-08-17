var express = require('express');
var router = express.Router();
var Bank = require('./../models/bank');
var Util = require('./../components/Util');
var Excel = require('exceljs');

/* GET bank listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		data: {table:"bank", attributeData:Bank.attributeData},
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
			data: {model:model, attributeData: Bank.attributeData},
			renderBody: "bank/view.ejs"
		});
	});
});

router.get('/create', function (req, res, next) {
	res.render("layouts/main", {
		data: {model:Bank.newEmpty, attributeData: Bank.attributeData},
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

router.get('/update/:id', function (req, res, next) {
	Bank.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model: model, attributeData: Bank.attributeData},
			renderBody: "bank/update.ejs"
		});
	}).catch(function (error) {
		var data = {}
		data.status = 0; data.data = error;
		res.json(data);
	});
});

router.post('/update/:id', function (req, res, next) {
	var data = {};
	Bank.findById(req.params.id).then(function (model) {
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

router.get('/excel', function (req, res, next) {

	var workbook = new Excel.Workbook();
	var worksheet = workbook.addWorksheet('Bank', {pageSetup: {paperSize: 9, orientation: 'landscape'}});
	var sequence = Util.excelSequence();
	var fields = Bank.keys;
	var start = 3, num = 1;

	worksheet.getCell('A1').value = '#';

	Bank.getGridFilter(req.query).then(function (items) {
		var models = items.data;

		for (var i = 0; i < fields.length; i++) {
			var j = i + 1;
			worksheet.getCell(sequence[j] + '1').value = Util.capitalizeFirstLetter(fields[i]);
		}

		models.forEach(function (result) {
			for (var i = 0; i < fields.length; i++) {
				var j = i + 1;
				worksheet.getCell('A' + start).value = num;
				worksheet.getCell(sequence[j] + start).value = result[fields[i]];
			}
			start++;
			num++
		});

		var filePath = appRoot + '/temp/';
		var fileName = 'bank.xlsx';
		workbook.xlsx.writeFile(filePath + fileName).then(function () {res.download(filePath + fileName);});
	}).catch(function (err) {res.json(err);});
});

router.get('/parsing', function (req, res, next) {
	res.render("layouts/main", {
		data: {model:Bank.newEmpty, attributeData: Bank.attributeData},
		renderBody: "bank/parsing.ejs",
		renderEnd:"bank/parsingjs.ejs"
	});
});

module.exports = router;
