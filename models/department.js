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
	divisionId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	code: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: true
	},
	createDate: {
		type: Sequelize.DATE,
		allowNull: true
	},
	createBy: {
		type: Sequelize.INTEGER(11),
		allowNull: true
	},
	updateDate: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: "CURRENT_TIMESTAMP"
	},
	updateBy: {
		type: Sequelize.INTEGER(11),
		allowNull: true
	}
}

var model = sequelize.define("department", attributeData, {
	timestamps: false
});
model.attributeData = {companyId:null,divisionId:null,code:null,name:null,createDate:null,createBy:null,updateDate:null,updateBy:null,id:null};
model.keys = ["companyId","divisionId","code","name","createDate","createBy","updateDate","updateBy","id"];

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