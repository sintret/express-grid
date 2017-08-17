const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(10),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	address: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	city: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	province: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	code: {
		type: Sequelize.STRING(20),
		allowNull: true,
		validate: {notEmpty: true,max: 20}
	},
	status: {
		type: Sequelize.ENUM('1','0'),
		allowNull: false,
	}
}

var model = sequelize.define("factories", attributeData, {
	timestamps: false
});
model.attributeData = {name:'Name',address:'Address',city:'City',province:'Province',code:'Code',status:'Status',id:'Id'};
model.keys = ["name","address","city","province","code","status","id"];
model.newEmpty = {name:null,address:null,city:null,province:null,code:null,status:null,id:null};


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