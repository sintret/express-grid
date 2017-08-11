const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		primaryKey: true,
		autoIncrement: true
	},
	companyId: {
		type: Sequelize.INTEGER(11),
		allowNull: true
	},
	status: {
		type: Sequelize.INTEGER(1),
		allowNull: false
	},
	createDate: {
		type: Sequelize.DATE,
		allowNull: false
	},
	updateDate: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: "CURRENT_TIMESTAMP"
	}
}

var model = sequelize.define("company_access", attributeData, {
	timestamps: false
});
model.attributeData = {companyId:null,status:null,createDate:null,updateDate:null,id:null};
model.keys = ["companyId","status","createDate","updateDate","id"];

model.getGridFilter = function (query, callback) {
	callback = callback || function () {}
	var s = {};
	var limit = parseInt(query.pageSize || 20);
	var pageIndex = parseInt(query.pageIndex) || 1;
	var offset = limit * (pageIndex - 1);

	var o = {};
	o.raw = true;
	o.attributes = model.keys ;
	o.limit = limit;
	o.offset =offset;

	if (query) {
		for (var q in query) {
			var a = keys.indexOf(q);
			if (a >= 0) {
				if (query[q] != "") {
					s[q] = {$like: '%' + query[q] + '%'}
				}
			}
		}
		if (s) {o.where = s;}
	}

	return new Promise(function (resolve, reject) {
		model.findAndCountAll(o).then(function (results) {
			var x = {}
			x.data = results.rows;
			x.itemsCount = results.count;
			resolve(x);
			return callback(null, x);
		});
	});
}
module.exports = model;