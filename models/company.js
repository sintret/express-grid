const Sequelize = require('sequelize');
var sequelize = require('./config.js');
var attributeData = {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: ""
    },
    codes: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    alias: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    employeeCategoryId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    typeTaxId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    workDays: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
        defaultValue: "5"
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    npwp: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    kota: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    jamsostekNo: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    fax: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    virtual_account: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    contactPerson: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    officerName: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    officerId: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    position: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    createDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    formulaId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    group: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: "group"
    },
    groupId: {
        type: Sequelize.INTEGER(11),
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
    kodeAkunPajak: {
        type: Sequelize.STRING(6),
        allowNull: false
    },
    kodeSetoran: {
        type: Sequelize.STRING(3),
        allowNull: false
    },
    uraianPembayaran: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    jointDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    tenagaKerja: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    upah: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
    },
    bpjs: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    online: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: "0"
    },
    logo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    onlineDate: {
        type: Sequelize.DATE,
        allowNull: false
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

var model = sequelize.define("company", attributeData, {
    timestamps: false
});
model.attributeData = {
    code: null,
    codes: null,
    alias: null,
    employeeCategoryId: null,
    typeTaxId: null,
    workDays: null,
    name: null,
    npwp: null,
    address: null,
    kota: null,
    description: null,
    jamsostekNo: null,
    telephone: null,
    fax: null,
    virtual_account: null,
    contactPerson: null,
    officerName: null,
    officerId: null,
    position: null,
    createDate: null,
    formulaId: null,
    group: null,
    groupId: null,
    contractNo: null,
    startContract: null,
    endContract: null,
    kodeAkunPajak: null,
    kodeSetoran: null,
    uraianPembayaran: null,
    jointDate: null,
    tenagaKerja: null,
    upah: null,
    bpjs: null,
    online: null,
    logo: null,
    onlineDate: null,
    createBy: null,
    updateDate: null,
    updateBy: null,
    id: null
};
model.keys = ["code", "codes", "alias", "employeeCategoryId", "typeTaxId", "workDays", "name", "npwp", "address", "kota", "description", "jamsostekNo", "telephone", "fax", "virtual_account", "contactPerson", "officerName", "officerId", "position", "createDate", "formulaId", "group", "groupId", "contractNo", "startContract", "endContract", "kodeAkunPajak", "kodeSetoran", "uraianPembayaran", "jointDate", "tenagaKerja", "upah", "bpjs", "online", "logo", "onlineDate", "createBy", "updateDate", "updateBy", "id"];
