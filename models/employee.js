const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	companyId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		validate: {isAlphanumeric: true}
	},
	payrollId: {
		type: Sequelize.STRING(10),
		allowNull: true,
		validate: {notEmpty: true,max: 10}
	},
	clientId: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	groupId: {
		type: Sequelize.STRING(10),
		allowNull: true,
		validate: {notEmpty: true,max: 10}
	},
	salaryLabelId: {
		type: Sequelize.INTEGER(2),
		allowNull: true,
		defaultValue: "1",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	setupBuktiPotongId: {
		type: Sequelize.INTEGER(2),
		allowNull: true,
		defaultValue: "1",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	nik: {
		type: Sequelize.STRING(50),
		allowNull: false,
		validate: {max: 50}
	},
	fullname: {
		type: Sequelize.STRING(100),
		allowNull: false,
		validate: {max: 100}
	},
	preferName: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	status: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "1",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	religion: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	nationality: {
		type: Sequelize.INTEGER(1),
		allowNull: false,
		validate: {isAlphanumeric: true}
	},
	startDate: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		defaultValue: "0000-00-00",
		validate: {notEmpty: true}
	},
	endDate: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		defaultValue: "0000-00-00",
		validate: {notEmpty: true}
	},
	resign: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "0",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	masterJointDate: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		defaultValue: "0000-00-00",
		validate: {notEmpty: true}
	},
	gender: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	birthDate: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		defaultValue: "0000-00-00",
		validate: {notEmpty: true}
	},
	maritalStatus: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	dependentNo: {
		type: Sequelize.INTEGER(2),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	address1: {
		type: Sequelize.TEXT,
		allowNull: true,
		validate: {notEmpty: true}
	},
	address2: {
		type: Sequelize.TEXT,
		allowNull: true,
		validate: {notEmpty: true}
	},
	phoneHome: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	phoneMobile: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	email: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	mothersName: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	birthPlace: {
		type: Sequelize.STRING(128),
		allowNull: true,
		validate: {notEmpty: true,max: 128}
	},
	cardId: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	passportNo: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
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
	taxId: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	taxIdDate: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		validate: {notEmpty: true}
	},
	taxIdAddress: {
		type: Sequelize.TEXT,
		allowNull: true,
		validate: {notEmpty: true}
	},
	taxOfficeId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	picture: {
		type: Sequelize.STRING(200),
		allowNull: true,
		validate: {notEmpty: true,max: 200}
	},
	jamsostekNo: {
		type: Sequelize.STRING(200),
		allowNull: true,
		validate: {notEmpty: true,max: 200}
	},
	jamsostekOfficeId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	currencyId: {
		type: Sequelize.INTEGER(4),
		allowNull: true,
		defaultValue: "1",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	regularIncomeCompanyTaxId: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	irregularIncomeCompanyTaxId: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	paymentCurrency: {
		type: Sequelize.INTEGER(4),
		allowNull: true,
		defaultValue: "1",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	paymentMethodId: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "0",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	costCenter: {
		type: Sequelize.STRING(50),
		allowNull: true,
		defaultValue: "NULL",
		validate: {notEmpty: true,max: 50}
	},
	bankAccNo: {
		type: Sequelize.STRING(100),
		allowNull: true,
		validate: {notEmpty: true,max: 100}
	},
	beneficiaryName: {
		type: Sequelize.STRING(255),
		allowNull: true,
		validate: {notEmpty: true,max: 255}
	},
	bankSwiftCode: {
		type: Sequelize.STRING(50),
		allowNull: true,
		validate: {notEmpty: true,max: 50}
	},
	bankCode: {
		type: Sequelize.STRING(50),
		allowNull: true,
		validate: {notEmpty: true,max: 50}
	},
	bankBranchCode: {
		type: Sequelize.STRING(50),
		allowNull: true,
		validate: {notEmpty: true,max: 50}
	},
	bankSubBranchCode: {
		type: Sequelize.STRING(50),
		allowNull: true,
		validate: {notEmpty: true,max: 50}
	},
	taxCategoryId: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "1",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	overtimeOrNo: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "0",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	workingDay: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "5",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	branchOfficeId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	designationId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	departmentId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	divisionId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	positionId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	loanBalance: {
		type: Sequelize.DECIMAL(15,2),
		allowNull: true,
		defaultValue: "0.00",
		validate: {notEmpty: true}
	},
	jkkCode: {
		type: Sequelize.STRING(20),
		allowNull: true,
		validate: {notEmpty: true,max: 20}
	},
	jkmCode: {
		type: Sequelize.STRING(20),
		allowNull: true,
		validate: {notEmpty: true,max: 20}
	},
	jpkCode: {
		type: Sequelize.STRING(20),
		allowNull: true,
		validate: {notEmpty: true,max: 20}
	},
	jhtCode: {
		type: Sequelize.STRING(20),
		allowNull: true,
		validate: {notEmpty: true,max: 20}
	},
	pensiunCode: {
		type: Sequelize.STRING(20),
		allowNull: true,
		validate: {notEmpty: true,max: 20}
	},
	bpjs: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "0",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	bpjsNo: {
		type: Sequelize.STRING(128),
		allowNull: true,
		validate: {notEmpty: true,max: 128}
	},
	bpjsCurrent: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "2",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	dplkEECode: {
		type: Sequelize.STRING(10),
		allowNull: true,
		validate: {notEmpty: true,max: 10}
	},
	dplkERCode: {
		type: Sequelize.STRING(10),
		allowNull: true,
		validate: {notEmpty: true,max: 10}
	},
	workingPeriodeMutasi: {
		type: Sequelize.DATEONLY,
		allowNull: true,
		validate: {notEmpty: true}
	},
	workingPeriodeMutasiInt: {
		type: Sequelize.INTEGER(2),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	formula: {
		type: Sequelize.STRING(10),
		allowNull: true,
		validate: {notEmpty: true,max: 10}
	},
	formulaGross: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "0",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	params: {
		type: Sequelize.TEXT,
		allowNull: true,
		validate: {notEmpty: true}
	},
	password: {
		type: Sequelize.STRING(50),
		allowNull: true,
		validate: {notEmpty: true,max: 50}
	},
	online: {
		type: Sequelize.INTEGER(1),
		allowNull: true,
		defaultValue: "0",
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	createDate: {
		type: Sequelize.DATE,
		allowNull: true,
		validate: {notEmpty: true}
	},
	createBy: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	},
	updateDate: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: "CURRENT_TIMESTAMP",
	},
	updateBy: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
		validate: {notEmpty: true,isAlphanumeric: true}
	}
}

var model = sequelize.define("employee", attributeData, {
	timestamps: false
});
model.attributeData = {companyId:'CompanyId',payrollId:'PayrollId',clientId:'ClientId',groupId:'GroupId',salaryLabelId:'SalaryLabelId',setupBuktiPotongId:'SetupBuktiPotongId',nik:'Nik',fullname:'Fullname',preferName:'PreferName',status:'Status',religion:'Religion',nationality:'Nationality',startDate:'StartDate',endDate:'EndDate',resign:'Resign',masterJointDate:'MasterJointDate',gender:'Gender',birthDate:'BirthDate',maritalStatus:'MaritalStatus',dependentNo:'DependentNo',address1:'Address1',address2:'Address2',phoneHome:'PhoneHome',phoneMobile:'PhoneMobile',email:'Email',mothersName:'MothersName',birthPlace:'BirthPlace',cardId:'CardId',passportNo:'PassportNo',contractNo:'ContractNo',startContract:'StartContract',endContract:'EndContract',taxId:'TaxId',taxIdDate:'TaxIdDate',taxIdAddress:'TaxIdAddress',taxOfficeId:'TaxOfficeId',picture:'Picture',jamsostekNo:'JamsostekNo',jamsostekOfficeId:'JamsostekOfficeId',currencyId:'CurrencyId',regularIncomeCompanyTaxId:'RegularIncomeCompanyTaxId',irregularIncomeCompanyTaxId:'IrregularIncomeCompanyTaxId',paymentCurrency:'PaymentCurrency',paymentMethodId:'PaymentMethodId',costCenter:'CostCenter',bankAccNo:'BankAccNo',beneficiaryName:'BeneficiaryName',bankSwiftCode:'BankSwiftCode',bankCode:'BankCode',bankBranchCode:'BankBranchCode',bankSubBranchCode:'BankSubBranchCode',taxCategoryId:'TaxCategoryId',overtimeOrNo:'OvertimeOrNo',workingDay:'WorkingDay',branchOfficeId:'BranchOfficeId',designationId:'DesignationId',departmentId:'DepartmentId',divisionId:'DivisionId',positionId:'PositionId',loanBalance:'LoanBalance',jkkCode:'JkkCode',jkmCode:'JkmCode',jpkCode:'JpkCode',jhtCode:'JhtCode',pensiunCode:'PensiunCode',bpjs:'Bpjs',bpjsNo:'BpjsNo',bpjsCurrent:'BpjsCurrent',dplkEECode:'DplkEECode',dplkERCode:'DplkERCode',workingPeriodeMutasi:'WorkingPeriodeMutasi',workingPeriodeMutasiInt:'WorkingPeriodeMutasiInt',formula:'Formula',formulaGross:'FormulaGross',params:'Params',password:'Password',online:'Online',createDate:'CreateDate',createBy:'CreateBy',updateDate:'UpdateDate',updateBy:'UpdateBy',id:'Id'};
model.keys = ["companyId","payrollId","clientId","groupId","salaryLabelId","setupBuktiPotongId","nik","fullname","preferName","status","religion","nationality","startDate","endDate","resign","masterJointDate","gender","birthDate","maritalStatus","dependentNo","address1","address2","phoneHome","phoneMobile","email","mothersName","birthPlace","cardId","passportNo","contractNo","startContract","endContract","taxId","taxIdDate","taxIdAddress","taxOfficeId","picture","jamsostekNo","jamsostekOfficeId","currencyId","regularIncomeCompanyTaxId","irregularIncomeCompanyTaxId","paymentCurrency","paymentMethodId","costCenter","bankAccNo","beneficiaryName","bankSwiftCode","bankCode","bankBranchCode","bankSubBranchCode","taxCategoryId","overtimeOrNo","workingDay","branchOfficeId","designationId","departmentId","divisionId","positionId","loanBalance","jkkCode","jkmCode","jpkCode","jhtCode","pensiunCode","bpjs","bpjsNo","bpjsCurrent","dplkEECode","dplkERCode","workingPeriodeMutasi","workingPeriodeMutasiInt","formula","formulaGross","params","password","online","createDate","createBy","updateDate","updateBy","id"];
model.newEmpty = {companyId:null,payrollId:null,clientId:null,groupId:null,salaryLabelId:null,setupBuktiPotongId:null,nik:null,fullname:null,preferName:null,status:null,religion:null,nationality:null,startDate:null,endDate:null,resign:null,masterJointDate:null,gender:null,birthDate:null,maritalStatus:null,dependentNo:null,address1:null,address2:null,phoneHome:null,phoneMobile:null,email:null,mothersName:null,birthPlace:null,cardId:null,passportNo:null,contractNo:null,startContract:null,endContract:null,taxId:null,taxIdDate:null,taxIdAddress:null,taxOfficeId:null,picture:null,jamsostekNo:null,jamsostekOfficeId:null,currencyId:null,regularIncomeCompanyTaxId:null,irregularIncomeCompanyTaxId:null,paymentCurrency:null,paymentMethodId:null,costCenter:null,bankAccNo:null,beneficiaryName:null,bankSwiftCode:null,bankCode:null,bankBranchCode:null,bankSubBranchCode:null,taxCategoryId:null,overtimeOrNo:null,workingDay:null,branchOfficeId:null,designationId:null,departmentId:null,divisionId:null,positionId:null,loanBalance:null,jkkCode:null,jkmCode:null,jpkCode:null,jhtCode:null,pensiunCode:null,bpjs:null,bpjsNo:null,bpjsCurrent:null,dplkEECode:null,dplkERCode:null,workingPeriodeMutasi:null,workingPeriodeMutasiInt:null,formula:null,formulaGross:null,params:null,password:null,online:null,createDate:null,createBy:null,updateDate:null,updateBy:null,id:null};


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