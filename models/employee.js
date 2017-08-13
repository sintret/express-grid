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
	payrollId: {
		type: Sequelize.STRING(10),
		allowNull: false
	},
	clientId: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	groupId: {
		type: Sequelize.STRING(10),
		allowNull: false
	},
	salaryLabelId: {
		type: Sequelize.INTEGER(2),
		allowNull: false,
		defaultValue: "1"
	},
	setupBuktiPotongId: {
		type: Sequelize.INTEGER(2),
		allowNull: false,
		defaultValue: "1"
	},
	nik: {
		type: Sequelize.STRING(50),
		allowNull: true
	},
	fullname: {
		type: Sequelize.STRING(100),
		allowNull: true
	},
	preferName: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	status: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "1"
	},
	religion: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	nationality: {
		type: Sequelize.INTEGER(1),
		allowNull: true
	},
	startDate: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: "0000-00-00"
	},
	endDate: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: "0000-00-00"
	},
	resign: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "0"
	},
	masterJointDate: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: "0000-00-00"
	},
	gender: {
		type: Sequelize.INTEGER(1),
		allowNull: false
	},
	birthDate: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: "0000-00-00"
	},
	maritalStatus: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	dependentNo: {
		type: Sequelize.INTEGER(2),
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
	phoneHome: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	phoneMobile: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	email: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	mothersName: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	birthPlace: {
		type: Sequelize.STRING(128),
		allowNull: false
	},
	cardId: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	passportNo: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	contractNo: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	startContract: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: "0000-00-00"
	},
	endContract: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		defaultValue: "0000-00-00"
	},
	taxId: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	taxIdDate: {
		type: Sequelize.DATEONLY,
		allowNull: false
	},
	taxIdAddress: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	taxOfficeId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	picture: {
		type: Sequelize.STRING(200),
		allowNull: false
	},
	jamsostekNo: {
		type: Sequelize.STRING(200),
		allowNull: false
	},
	jamsostekOfficeId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	currencyId: {
		type: Sequelize.INTEGER(4),
		allowNull: false,
		defaultValue: "1"
	},
	regularIncomeCompanyTaxId: {
		type: Sequelize.INTEGER(1),
		allowNull: false
	},
	irregularIncomeCompanyTaxId: {
		type: Sequelize.INTEGER(1),
		allowNull: false
	},
	paymentCurrency: {
		type: Sequelize.INTEGER(4),
		allowNull: false,
		defaultValue: "1"
	},
	paymentMethodId: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "0"
	},
	costCenter: {
		type: Sequelize.STRING(50),
		allowNull: false,
		defaultValue: "NULL"
	},
	bankAccNo: {
		type: Sequelize.STRING(100),
		allowNull: false
	},
	beneficiaryName: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	bankSwiftCode: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	bankCode: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	bankBranchCode: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	bankSubBranchCode: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	taxCategoryId: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "1"
	},
	overtimeOrNo: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "0"
	},
	workingDay: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "5"
	},
	branchOfficeId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	designationId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	departmentId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	divisionId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	positionId: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	loanBalance: {
		type: Sequelize.DECIMAL(15,2),
		allowNull: false,
		defaultValue: "0.00"
	},
	jkkCode: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	jkmCode: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	jpkCode: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	jhtCode: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	pensiunCode: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	bpjs: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "0"
	},
	bpjsNo: {
		type: Sequelize.STRING(128),
		allowNull: false
	},
	bpjsCurrent: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "2"
	},
	dplkEECode: {
		type: Sequelize.STRING(10),
		allowNull: false
	},
	dplkERCode: {
		type: Sequelize.STRING(10),
		allowNull: false
	},
	workingPeriodeMutasi: {
		type: Sequelize.DATEONLY,
		allowNull: false
	},
	workingPeriodeMutasiInt: {
		type: Sequelize.INTEGER(2),
		allowNull: false
	},
	formula: {
		type: Sequelize.STRING(10),
		allowNull: false
	},
	formulaGross: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "0"
	},
	params: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	online: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		defaultValue: "0"
	},
	createDate: {
		type: Sequelize.DATE,
		allowNull: false
	},
	createBy: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	},
	updateDate: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: "CURRENT_TIMESTAMP"
	},
	updateBy: {
		type: Sequelize.INTEGER(11),
		allowNull: false
	}
}

var model = sequelize.define("employee", attributeData, {
	timestamps: false
});
model.attributeData = {companyId:null,payrollId:null,clientId:null,groupId:null,salaryLabelId:null,setupBuktiPotongId:null,nik:null,fullname:null,preferName:null,status:null,religion:null,nationality:null,startDate:null,endDate:null,resign:null,masterJointDate:null,gender:null,birthDate:null,maritalStatus:null,dependentNo:null,address1:null,address2:null,phoneHome:null,phoneMobile:null,email:null,mothersName:null,birthPlace:null,cardId:null,passportNo:null,contractNo:null,startContract:null,endContract:null,taxId:null,taxIdDate:null,taxIdAddress:null,taxOfficeId:null,picture:null,jamsostekNo:null,jamsostekOfficeId:null,currencyId:null,regularIncomeCompanyTaxId:null,irregularIncomeCompanyTaxId:null,paymentCurrency:null,paymentMethodId:null,costCenter:null,bankAccNo:null,beneficiaryName:null,bankSwiftCode:null,bankCode:null,bankBranchCode:null,bankSubBranchCode:null,taxCategoryId:null,overtimeOrNo:null,workingDay:null,branchOfficeId:null,designationId:null,departmentId:null,divisionId:null,positionId:null,loanBalance:null,jkkCode:null,jkmCode:null,jpkCode:null,jhtCode:null,pensiunCode:null,bpjs:null,bpjsNo:null,bpjsCurrent:null,dplkEECode:null,dplkERCode:null,workingPeriodeMutasi:null,workingPeriodeMutasiInt:null,formula:null,formulaGross:null,params:null,password:null,online:null,createDate:null,createBy:null,updateDate:null,updateBy:null,id:null};
model.keys = ["companyId","payrollId","clientId","groupId","salaryLabelId","setupBuktiPotongId","nik","fullname","preferName","status","religion","nationality","startDate","endDate","resign","masterJointDate","gender","birthDate","maritalStatus","dependentNo","address1","address2","phoneHome","phoneMobile","email","mothersName","birthPlace","cardId","passportNo","contractNo","startContract","endContract","taxId","taxIdDate","taxIdAddress","taxOfficeId","picture","jamsostekNo","jamsostekOfficeId","currencyId","regularIncomeCompanyTaxId","irregularIncomeCompanyTaxId","paymentCurrency","paymentMethodId","costCenter","bankAccNo","beneficiaryName","bankSwiftCode","bankCode","bankBranchCode","bankSubBranchCode","taxCategoryId","overtimeOrNo","workingDay","branchOfficeId","designationId","departmentId","divisionId","positionId","loanBalance","jkkCode","jkmCode","jpkCode","jhtCode","pensiunCode","bpjs","bpjsNo","bpjsCurrent","dplkEECode","dplkERCode","workingPeriodeMutasi","workingPeriodeMutasiInt","formula","formulaGross","params","password","online","createDate","createBy","updateDate","updateBy","id"];

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