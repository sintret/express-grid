'use strict';

String.prototype.replaceArray = function (find, replace) {
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

var Generator = function (arr, table) {
    arr = arr || [];
    table = table || "";

    this.tab = '\t';
    this.newLine = '\r\n';
    this.spaces = '   ';
    this.fields = arr.length > 0 ? arr[0] : [];


    this.outputModel = function () {
        if (arr.length == 0) {
            return '';
        }

        var out = '';
        out += "const Sequelize = require('sequelize');";
        out += this.newLine;
        out += "var sequelize = require('./config.js');";
        out += this.newLine;
        out += this.attributeData();

        out += this.newLine + this.newLine;
        out += 'var model = sequelize.define("' + table + '", attributeData, {';
        out += this.newLine + this.tab + 'timestamps: false';
        out += this.newLine;
        out += '});';
        out += this.newLine;
        out += 'model.attributeData = ' + JSON.stringify(this.obj()).replace(/"/g, '') + ';';
        out += this.newLine;
        out += 'model.keys = ' + JSON.stringify(this.keys()) + ';';
        out += this.newLine + this.newLine;
        out += this.grid();
        out += 'module.exports = model;';


        return out;
    }

    this.outputRoutes = function () {
        if (arr.length == 0) {
            return '';
        }

        var out = '';
        out += "var express = require('express');" + this.newLine;
        out += "var router = express.Router();" + this.newLine;
        out += "var " + this.capitalizeFirstLetter(table) + " = require('./../models/" + table + ".js');" + this.newLine + this.newLine
        out += "/* GET users listing. */" + this.newLine;
        out += "router.get('/list', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + ".getGridFilter(req.query).then(function (items) {" + this.newLine;
        out += this.tab + this.tab + "res.json(items);" + this.newLine;
        out += this.tab + "});" + this.newLine;
        out += "});" + this.newLine;
        out += "module.exports = router;" + this.newLine;

        return out;
    }

    this.outputViewIndex = function () {

    }

    this.attributeData = function () {
        var out = '';
        out += 'var attributeData = {';
        for (var i = 0; i < this.fields.length; i++) {
            out += this.newLine;
            out += this.structure(this.fields[i]);
        }
        out = out.slice(0, -1);
        out += this.newLine;
        out += '}';

        return out;
    }

    this.grid = function () {
        var out = '';
        out += 'model.getGridFilter = function (query, callback) {';
        out += this.newLine;
        out += this.tab + 'callback = callback || function () {}' + this.newLine;
        out += this.tab + 'var s = {};' + this.newLine;
        out += this.tab + 'var limit = parseInt(query.pageSize || 20);' + this.newLine;
        out += this.tab + 'var pageIndex = parseInt(query.pageIndex) || 1;' + this.newLine;
        out += this.tab + 'var offset = limit * (pageIndex - 1);' + this.newLine + this.newLine;
        out += this.tab + 'var keys = model.keys;' + this.newLine;
        out += this.tab + 'var o = {};' + this.newLine;
        out += this.tab + 'o.raw = true;' + this.newLine;
        out += this.tab + 'o.attributes = keys ;' + this.newLine;
        out += this.tab + 'o.limit = limit;' + this.newLine;
        out += this.tab + 'o.offset =offset;' + this.newLine + this.newLine;
        out += this.tab + 'if (query) {' + this.newLine;
        out += this.tab + this.tab + 'for (var q in query) {' + this.newLine;
        out += this.tab + this.tab + this.tab + 'var a = keys.indexOf(q);' + this.newLine;
        out += this.tab + this.tab + this.tab + 'if (a >= 0) {' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + 'if (query[q] != "") {' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + "s[q] = {$like: '%' + query[q] + '%'}" + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '}' + this.newLine;
        out += this.tab + this.tab + this.tab + '}' + this.newLine;
        out += this.tab + this.tab + '}' + this.newLine;
        out += this.tab + this.tab + 'if (s) {o.where = s;}' + this.newLine;
        out += this.tab + '}' + this.newLine + this.newLine;

        out += this.tab + 'return new Promise(function (resolve, reject) {' + this.newLine;
        out += this.tab + this.tab + 'model.findAndCountAll(o).then(function (results) {' + this.newLine;
        out += this.tab + this.tab + this.tab + 'var x = {}' + this.newLine;
        out += this.tab + this.tab + this.tab + 'x.data = results.rows;' + this.newLine;
        out += this.tab + this.tab + this.tab + 'x.itemsCount = results.count;' + this.newLine;
        out += this.tab + this.tab + this.tab + 'resolve(x);' + this.newLine;
        out += this.tab + this.tab + this.tab + 'return callback(null, x);' + this.newLine;
        out += this.tab + this.tab + '});' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '}' + this.newLine;

        return out;
    }

    this.structure = function (obj) {
        var s = '';
        var fieldName = this.tab + obj['Field'];
        s += fieldName + ': {';
        s += this.newLine;
        s += this.getType(obj['Type']) + ',';
        if (obj.Null == "NO") {
            s += this.newLine;
            s += this.tab + this.tab + 'allowNull: true,';
        } else {
            s += this.newLine;
            s += this.tab + this.tab + 'allowNull: false,';
        }

        if (obj.Key == "PRI") {
            s += this.newLine;
            s += this.tab + this.tab + 'primaryKey: true,';
        }
        if (obj.Extra == "auto_increment") {
            s += this.newLine;
            s += this.tab + this.tab + 'autoIncrement: true,';
        }
        if (obj.Default != null) {
            s += this.newLine;
            s += this.tab + this.tab + 'defaultValue: "' + obj.Default + '",';
        }

        s = s.slice(0, -1);

        s += this.newLine;
        s += this.tab + '},';

        return s;
    }

    this.getType = function (type) {
        type = type.toLowerCase();
        var s = 'bigint';
        var tiny = 'tinyint';
        var date = 'date';
        var r;

        if (type.indexOf(s) >= 0) {
            r = t;
        } else if (type.indexOf(tiny) >= 0) {
            r = type.replace(tiny, "INTEGER");
        } else {
            var find = ["int", "varchar", "char", "timestamp", "datetime", "date"];
            var replace = ["INTEGER", "STRING", "STRING", "DATE", "DATE", "DATEONLY"];
            r = type.replaceArray(find, replace);
        }

        return this.tab + this.tab + "type: Sequelize." + r.toUpperCase();
    }


    this.obj = function () {
        var keys = this.keys();
        var obj = {}
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = null;
        }

        return obj;
    }
    this.keys = function () {
        var keys = [];
        var id = false;
        for (var i = 0; i < this.fields.length; i++) {
            if (this.fields[i]['Key'] != "PRI") {
                keys.push(this.fields[i]['Field']);
            }

            if (this.fields[i]['Field'] == "id") {
                id = true;
            }
        }

        if (id == true) {
            keys.push("id");
        }

        return keys;
    }

    this.tableArray = function (arr) {
        var r = [];
        var tables = arr[0];

        for (var i = 0; i < tables.length; i++) {
            for (var obj in tables[i]) {
                r.push(tables[i][obj]);
            }
        }

        return r;
    }

    this.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

module.exports = Generator;