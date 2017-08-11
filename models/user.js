/*
 sequelize-auto -o "./models" -d chat -h localhost -u root -p 3306 -e mysql -t user
 */
const Sequelize = require('sequelize');
var sequelize = require('./config.js');

var attributeData = {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    fullname: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    roleId: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
        defaultValue: '3'
    },
    status: {
        type: Sequelize.INTEGER(1),
        allowNull: true,
        defaultValue: '0'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}

//Model singleton
var model = sequelize.define('user', attributeData, {
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

    callback = callback || function () {}
    var s = {};

    var limit = parseInt(query.pageSize || 20);
    var pageIndex = parseInt(query.pageIndex) || 1;
    var offset = limit * (pageIndex - 1);

    var o = {};
    o.raw = true;
    o.attributes = ['username', 'fullname', 'email', 'roleId', 'status', ['id', '_id']];
    o.limit = limit;
    o.offset =offset;
    o.$sort ={id: 1}

    if (query) {
        for (var q in query) {
            var a = keys.indexOf(q);
            if (a >= 0) {
                if (query[q] != "") {
                    if (q == 'roleId') {
                        if (query[q] > 0) {
                            s[q] = query[q];
                        }
                    } else if (q == 'status') {
                        if (query[q] == 'false') {
                            s[q] = 0;
                        } else {
                            s[q] = 1;
                        }
                    } else {
                        s[q] = {
                            $like: '%' + query[q] + '%'
                        }
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