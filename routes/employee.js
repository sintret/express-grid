var express = require('express');
var router = express.Router();
var Employee = require('./../models/employee');
var Util = require('./../components/Util');
var Excel = require('exceljs');

/* GET employee listing. */
router.get('/', function (req, res, next) {
	res.render("layouts/main", {
		data: {table:"employee", attributeData:Employee.attributeData},
		renderBody: "employee/index.ejs",
		renderEnd: "employee/grid.ejs"
	});
});

router.get('/list', function (req, res, next) {
	Employee.getGridFilter(req.query).then(function (items) {
		res.json(items);
	});
});

router.delete('/:id', function (req, res, next) {
	Employee.destroy({
		where: {id: req.params.id}
	}).then(function (deletedOwner) {
		res.json(deletedOwner);
	});
});

router.get('/view/:id', function (req, res, next) {
	Employee.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model:model, attributeData: Employee.attributeData},
			renderBody: "employee/view.ejs"
		});
	});
});

router.get('/create', function (req, res, next) {
	res.render("layouts/main", {
		data: {model:Employee.newEmpty, attributeData: Employee.attributeData},
		renderBody: "employee/create.ejs"
	});
});

router.post('/create', function (req, res, next) {
	Employee.insertData(req.body).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		res.json(err);
	});
});

router.get('/update/:id', function (req, res, next) {
	Employee.findById(req.params.id).then(function (model) {
		res.render("layouts/main", {
			data: {model: model, attributeData: Employee.attributeData},
			renderBody: "employee/update.ejs"
		});
	}).catch(function (error) {
		var data = {}
		data.status = 0; data.data = error;
		res.json(data);
	});
});

router.post('/update/:id', function (req, res, next) {
	var data = {};
	Employee.findById(req.params.id).then(function (model) {
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
	var worksheet = workbook.addWorksheet('Employee', {pageSetup: {paperSize: 9, orientation: 'landscape'}});
	var sequence = Util.excelSequence();
	var fields = Employee.keys;
	var start = 3, num = 1;

	worksheet.getCell('A1').value = '#';

	Employee.getGridFilter(req.query).then(function (items) {

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
		var fileName = 'employee.xlsx';
		workbook.xlsx.writeFile(filePath + fileName).then(function () {res.download(filePath + fileName);});
	}).catch(function (err) {res.json(err);});
});
router.get('/parsing', function (req, res, next) {
	res.render("layouts/main", {
		data: {table:"employee", attributeData:Employee.attributeData},
		renderBody: "employee/parsing.ejs",
		renderEnd: "employee/parsingjs.ejs"
	});
});

module.exports = router;
