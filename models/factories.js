const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(10),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	address: {
		type: Sequelize.STRING(255),
		allowNull: true
	},
	city: {
		type: Sequelize.STRING(255),
		allowNull: true
	},
	province: {
		type: Sequelize.STRING(255),
		allowNull: true
	},
	code: {
		type: Sequelize.STRING(20),
		allowNull: true
	},
	status: {
		type: Sequelize.ENUM('1','0'),
		allowNull: false
	}
}

var model = sequelize.define("factories", attributeData, {
	timestamps: false
});
model.attributeData = {name:null,address:null,city:null,province:null,code:null,status:null,id:null};
model.keys = ["name","address","city","province","code","status","id"];

model.getGridFilter = function (query, callback) {
	callback = callback || function () {}
	var s = {};
	var limit = parseInt(query.pageSize || 20);
	var pageIndex = parseInt(query.pageIndex) || 1;
	var offset = limit * (pageIndex - 1);

	var keys = model.keys;
	var o = {};
	o.raw = true;
	o.attributes = keys ;
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