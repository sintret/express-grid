const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		primaryKey: true,
		autoIncrement: true
	},
	fullname: {
		type: Sequelize.STRING(255),
		allowNull: true
	},
	provinsiId: {
		type: Sequelize.INTEGER(11),
		allowNull: true
	},
	kabupatenId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	kecamatanId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	kodepos: {
		type: Sequelize.STRING(5),
		allowNull: false
	},
	address1: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	address2: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	phone1: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	phone2: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	email: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	remark: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	checked: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "1"
	},
	billing_fullname: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	billing_provinsiId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	billing_kabupatenId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	billing_kecamatanId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	billing_kodepos: {
		type: Sequelize.STRING(5),
		allowNull: false
	},
	billing_address1: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	billing_address2: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	billing_phone1: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	billing_phone2: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	billing_email: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	billing_remark: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	billing_checked: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "1"
	},
	shipping_fullname: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	shipping_provinsiId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	shipping_kabupatenId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	shipping_kecamatanId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	shipping_kodepos: {
		type: Sequelize.STRING(5),
		allowNull: false
	},
	shipping_address1: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	shipping_address2: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	shipping_phone1: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	shipping_phone2: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	shipping_email: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	shipping_remark: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	shipping_checked: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "1"
	},
	latitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	longitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	userCreate: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		defaultValue: "1"
	},
	userUpdate: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		defaultValue: "1"
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

var model = sequelize.define("member", attributeData, {
	timestamps: false
});
model.attributeData = {fullname:null,provinsiId:null,kabupatenId:null,kecamatanId:null,kodepos:null,address1:null,address2:null,phone1:null,phone2:null,email:null,remark:null,checked:null,billing_fullname:null,billing_provinsiId:null,billing_kabupatenId:null,billing_kecamatanId:null,billing_kodepos:null,billing_address1:null,billing_address2:null,billing_phone1:null,billing_phone2:null,billing_email:null,billing_remark:null,billing_checked:null,shipping_fullname:null,shipping_provinsiId:null,shipping_kabupatenId:null,shipping_kecamatanId:null,shipping_kodepos:null,shipping_address1:null,shipping_address2:null,shipping_phone1:null,shipping_phone2:null,shipping_email:null,shipping_remark:null,shipping_checked:null,latitude:null,longitude:null,userCreate:null,userUpdate:null,createDate:null,updateDate:null,id:null};
model.keys = ["fullname","provinsiId","kabupatenId","kecamatanId","kodepos","address1","address2","phone1","phone2","email","remark","checked","billing_fullname","billing_provinsiId","billing_kabupatenId","billing_kecamatanId","billing_kodepos","billing_address1","billing_address2","billing_phone1","billing_phone2","billing_email","billing_remark","billing_checked","shipping_fullname","shipping_provinsiId","shipping_kabupatenId","shipping_kecamatanId","shipping_kodepos","shipping_address1","shipping_address2","shipping_phone1","shipping_phone2","shipping_email","shipping_remark","shipping_checked","latitude","longitude","userCreate","userUpdate","createDate","updateDate","id"];

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