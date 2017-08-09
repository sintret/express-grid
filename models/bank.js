const Sequelize = require('sequelize');
var sequelize = require('./config.js');

var attributeData = {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    swiftCode: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    bankCode: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    bankName: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    branchCode: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    branchName: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    subBranchCode: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    subBranchName: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    remark: {
        type: Sequelize.STRING(255),
        allowNull: false
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
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateBy: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }
}


//Model singleton
var model = sequelize.define('bank', attributeData, {
    timestamps: false
});

var obj = {};
var keys = [];
for (var property in attributeData) {
    if (attributeData.hasOwnProperty(property)) {
        obj.property = null;
        keys.push(property);
    }
}

//get attribute data
model.attributeData = obj;
model.keys = keys;

//filter for jsgrid
model.getGridFilter = function (query, callback) {

    callback = callback || function () {
        }


    var r = {};
    var where = null;
    var s = {};


    console.log(query);

    var limit = parseInt(query.pageSize || 20);
    var pageIndex = parseInt(query.pageIndex) || 1;
    var offset = limit * (pageIndex - 1);
    // var page = req.query.page || 1;
    // var pages = Math.ceil(data.count / limit);


    var o = {};
    o.raw = true;
    o.attributes = ['swiftCode', 'bankCode', 'bankName', 'branchName', 'city', 'id'];
    o.limit = limit;
    o.offset = offset;
    o.$sort = {id: 1}

    if (query) {
        for (var q in query) {
            var a = keys.indexOf(q);
            if (a >= 0) {
                if (query[q] != "") {
                    s[q] = {
                        $like: '%' + query[q] + '%'
                    }
                }
            }
        }
        if (s) {
            o.where = s;
        }
    }

    console.log(o);

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