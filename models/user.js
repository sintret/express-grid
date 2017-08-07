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
for (var property in attributeData) {
    if (attributeData.hasOwnProperty(property)) {
        // do stuff
        obj.property = null;
    }
}

//get attribute data
model.attributeData = obj;
model.getGridFilter = function (query, callback) {

    callback = callback || function () {}

    var r = {};
    var where = null;
    var s = {};

    console.log(query);
/*    if (query) {
        for (var key in query) {
            if(query[key]){
                var t =
                s.key = query.key;
            }
        }
    }*/

    return new Promise(function (resolve, reject) {
        model.findAll({
            raw: true,
            attributes: ['username', 'fullname','email','roleId','status']
        }).then(function (users) {

            if(!users){
                var err = {error:true,msg:'error'}
                reject(err);
                return callback(err);
            }

            resolve(users);
            return callback(null,users);
        });

    });


}
module.exports = model;