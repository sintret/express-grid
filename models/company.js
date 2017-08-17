const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	code: {
		type: Sequelize.STRING(20),
		allowNull: false,
		defaultValue: "",
		validate: {max: 20}
	},
	codes: {
		type: Sequelize.STRING(20),
		allowNull: true,
		validate: {notEmpty: true,max: 20}
	},
	alias: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	employeeCategoryId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {isAlphanumeric: true}
	},
	typeTaxId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {isAlphanumeric: true}
	},
	workDays: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "5",
		validate: {isAlphanumeric: true}
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {max: 255}
	},
	npwp: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	address: {
		type: Sequelize.TEXT,
		allowNull: true,
		validate: {notEmpty: true}
	},
	kota: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true,
		validate: {notEmpty: true}
	},
	jamsostekNo: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	telephone: {
		type: Sequelize.STRING(50),
		allowNull: true,
		validate: {notEmpty: true,max: 50}
	},
	fax: {
		type: Sequelize.STRING(50),
		allowNull: true,
		validate: {notEmpty: true,max: 50}
	},
	virtual_account: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	contactPerson: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	officerName: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	officerId: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	position: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	createDate: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	formulaId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	group: {
		type: Sequelize.STRING(50),
		allowNull: false,
		defaultValue: "group",
		validate: {max: 50}
	},
	groupId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	contractNo: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	startContract: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		defaultValue: "0000-00-00",
		validate: {notEmpty: true}
	},
	endContract: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		defaultValue: "0000-00-00",
		validate: {notEmpty: true}
	},
	kodeAkunPajak: {
		type: Sequelize.STRING(6),
		allowNull: true,
		validate: {notEmpty: true,max: 6}
	},
	kodeSetoran: {
		type: Sequelize.STRING(3),
		allowNull: true,
		validate: {notEmpty: true,max: 3}
	},
	uraianPembayaran: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	jointDate: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		validate: {notEmpty: true}
	},
	tenagaKerja: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	upah: {
		type: Sequelize.DECIMAL(15,2),
		allowNull: true,
		validate: {notEmpty: true}
	},
	bpjs: {
		type: Sequelize.STRING(128),
		allowNull: true,
		validate: {notEmpty: true,max: 128}
	},
	online: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "0",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	logo: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	onlineDate: {
		type: Sequelize.DATE,
		allowNull: true,
		validate: {notEmpty: true}
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

var model = sequelize.define("company", attributeData, {
	timestamps: false
});
model.attributeData = {code:'Code',codes:'Codes',alias:'Alias',employeeCategoryId:'EmployeeCategoryId',typeTaxId:'TypeTaxId',workDays:'WorkDays',name:'Name',npwp:'Npwp',address:'Address',kota:'Kota',description:'Description',jamsostekNo:'JamsostekNo',telephone:'Telephone',fax:'Fax',virtual_account:'Virtual_account',contactPerson:'ContactPerson',officerName:'OfficerName',officerId:'OfficerId',position:'Position',createDate:'CreateDate',formulaId:'FormulaId',group:'Group',groupId:'GroupId',contractNo:'ContractNo',startContract:'StartContract',endContract:'EndContract',kodeAkunPajak:'KodeAkunPajak',kodeSetoran:'KodeSetoran',uraianPembayaran:'UraianPembayaran',jointDate:'JointDate',tenagaKerja:'TenagaKerja',upah:'Upah',bpjs:'Bpjs',online:'Online',logo:'Logo',onlineDate:'OnlineDate',createBy:'CreateBy',updateDate:'UpdateDate',updateBy:'UpdateBy',id:'Id'};
model.keys = ["code","codes","alias","employeeCategoryId","typeTaxId","workDays","name","npwp","address","kota","description","jamsostekNo","telephone","fax","virtual_account","contactPerson","officerName","officerId","position","createDate","formulaId","group","groupId","contractNo","startContract","endContract","kodeAkunPajak","kodeSetoran","uraianPembayaran","jointDate","tenagaKerja","upah","bpjs","online","logo","onlineDate","createBy","updateDate","updateBy","id"];
model.newEmpty = {code:null,codes:null,alias:null,employeeCategoryId:null,typeTaxId:null,workDays:null,name:null,npwp:null,address:null,kota:null,description:null,jamsostekNo:null,telephone:null,fax:null,virtual_account:null,contactPerson:null,officerName:null,officerId:null,position:null,createDate:null,formulaId:null,group:null,groupId:null,contractNo:null,startContract:null,endContract:null,kodeAkunPajak:null,kodeSetoran:null,uraianPembayaran:null,jointDate:null,tenagaKerja:null,upah:null,bpjs:null,online:null,logo:null,onlineDate:null,createBy:null,updateDate:null,updateBy:null,id:null};


model.getGridFilter = function (query, callback) {
	callback = callback || function () {}
	var s = {};
	var limit = parseInt(query.pageSize || 20);
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