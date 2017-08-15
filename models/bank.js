const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	swiftCode: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	bankCode: {
		type: Sequelize.STRING(20),
		allowNull: false,
		validate: {max: 20}
	},
	bankName: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	branchCode: {
		type: Sequelize.STRING(20),
		allowNull: false,
		validate: {max: 20}
	},
	branchName: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	city: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	subBranchCode: {
		type: Sequelize.STRING(20),
		allowNull: false,
		validate: {max: 20}
	},
	subBranchName: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	remark: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	createDate: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	createBy: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {isAlphanumeric: true}
	},
	updateDate: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: "CURRENT_TIMESTAMP",
	},
	updateBy: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {isAlphanumeric: true}
	}
}

var model = sequelize.define("bank", attributeData, {
	timestamps: false
});
model.attributeData = {swiftCode:null,bankCode:null,bankName:null,branchCode:null,branchName:null,city:null,subBranchCode:null,subBranchName:null,remark:null,createDate:null,createBy:null,updateDate:null,updateBy:null,id:null};
model.keys = ["swiftCode","bankCode","bankName","branchCode","branchName","city","subBranchCode","subBranchName","remark","createDate","createBy","updateDate","updateBy","id"];

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