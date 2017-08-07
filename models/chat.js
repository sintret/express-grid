const Sequelize = require('sequelize');
var sequelize = require('./config.js');

var attributeData = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  from: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  to: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}

//Model singleton
var model = sequelize.define('chat', attributeData,{
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
module.exports = model;