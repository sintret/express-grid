const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	message: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	from: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {isAlphanumeric: true}
	},
	to: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {isAlphanumeric: true}
	},
	updatedAt: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: "CURRENT_TIMESTAMP",
	}
}

var model = sequelize.define("chat", attributeData, {
	timestamps: false
});
model.attributeData = {message:'Message',from:'From',to:'To',updatedAt:'UpdatedAt',id:'Id'};
model.keys = ["message","from","to","updatedAt","id"];
model.newEmpty = {message:null,from:null,to:null,updatedAt:null,id:null};


model.getGridFilter = function (query, callback) {
	callback = callback || function () {}
	var s = {};
	var limit = parseInt(query.pageSize || 50);
	var pageIndex = parseInt(query.pageIndex) || 1;
	var offset = limit * (pageIndex - 1);
	var sortField = query.sortField || "id";
	var sortOrder = query.sortOrder || "DESC";
	sortOrder = sortOrder.toUpperCase();

	var keys = model.keys;
	var o = {};
	o.raw = true;
	o.attributes = keys ;
	o.limit = limit;
	o.offset =offset;

	o.order = [[sortField,sortOrder]];

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

model.insertData = function (data,callback) {
	callback = callback || function () {}

	return new Promise(function (resolve, reject) {
		model.create(data).then(function (x) {
			var json = {};json.status=1;json.data=x;resolve(json);
		}).catch(Sequelize.ValidationError, function (err) {
			var json = {};json.status=0;json.data=err;reject(json);
		});
	});
}
module.exports = model;