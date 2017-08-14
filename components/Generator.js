'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');

String.prototype.replaceArray = function (find, replace) {
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

var Generator = function (arr, table, dirRoot) {
    arr = arr || [];
    table = table || "";
    dirRoot = dirRoot || "";

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
        out += "/* GET " + table + " listing. */" + this.newLine;

        //index controller
        out += "router.get('/', function (req, res, next) {" + this.newLine;
        out += this.tab + 'res.render("layouts/main", {' + this.newLine;
        out += this.tab + this.tab + 'data: {table:"' + table + '"},' + this.newLine;
        out += this.tab + this.tab + 'renderBody: "' + table + '/index.ejs",' + this.newLine;
        out += this.tab + this.tab + 'renderEnd: "' + table + '/grid.ejs"' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '});' + this.newLine;

        //list via grid controller / load data
        out += "router.get('/list', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + ".getGridFilter(req.query).then(function (items) {" + this.newLine;
        out += this.tab + this.tab + "res.json(items);" + this.newLine;
        out += this.tab + "});" + this.newLine;
        out += "});" + this.newLine;

        //delete controller
        out += "router.delete('/:id', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + ".destroy({" + this.newLine;
        out += this.tab + this.tab + "where: {id: req.params.id}" + this.newLine;
        out += this.tab + "}).then(function (deletedOwner) {" + this.newLine;
        out += this.tab + this.tab + "res.json(deletedOwner);" + this.newLine;
        out += this.tab + "});" + this.newLine;
        out += "});" + this.newLine;

        //view controller
        out += "router.get('/view/:id', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + ".findById(req.params.id).then(function (model) {" + this.newLine;
        out += this.tab + this.tab + 'res.render("layouts/main", {' + this.newLine;
        out += this.tab + this.tab + this.tab + "data: {model:model}," + this.newLine;
        out += this.tab + this.tab + this.tab + 'renderBody: "'+table+'/view.ejs"' + this.newLine;
        out += this.tab + this.tab + '});' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '});' + this.newLine;


        out += "module.exports = router;" + this.newLine;

        return out;
    }

    this.outputViewsIndex = function () {

        var out = '';
        out += '<div class="page-header">' + this.newLine;
        out += this.tab + "<h1><%= title %></h1>" + this.newLine;
        out += "</div>" + this.newLine + this.newLine;
        out += '<div class="panel panel-info">' + this.newLine;
        out += this.tab + '<div class="panel-heading">' + this.newLine;
        out += this.tab + this.tab + '<div class="pull-right">' + this.newLine;
        out += this.tab + this.tab + this.tab + '<div class="summary">Showing <b>1-100</b> of <b>21,387</b> items.</div>' + this.newLine;
        out += this.tab + this.tab + '</div>' + this.newLine;
        out += this.tab + this.tab + '<h3 class="panel-title"><i class="glyphicon glyphicon-book"></i> ' + this.capitalizeFirstLetter(table) + ' Grid</h3>' + this.newLine;
        out += this.tab + this.tab + '<div class="clearfix"></div>' + this.newLine;
        out += this.tab + '</div>' + this.newLine;
        out += this.tab + '<div class="kv-panel-before">' + this.newLine;
        out += this.tab + this.tab + '<div class="pull-right">' + this.newLine;
        out += this.tab + this.tab + this.tab + '<div class="btn-toolbar kv-grid-toolbar" role="toolbar">' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '<div class="btn-group">' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '<a type="button" id="create_btn" class="btn btn-success"href="/' + table + '/create" title="Add Data"><i class="glyphicon glyphicon-plus"></i></a>' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '<a type="button" class="btn btn-warning" href="/' + table + '/parsing" title="Import Excel"><i class="fa fa-file-excel-o"></i></a>' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '<button type="button" id="backupExcel" class="btn btn-default" title="Excel Backup"><i class="fa fa-download"></i></button>' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '<a class="btn btn-default" href="/' + table + '" title="Refresh Grid" ><i class="glyphicon glyphicon-repeat"></i></a></div>' + this.newLine;
        out += this.tab + this.tab + this.tab + '</div>' + this.newLine;
        out += this.tab + this.tab + '</div>' + this.newLine;
        out += this.tab + this.tab + '<div style="padding-top: 7px;"><em>* Exports &amp; Imports Excel Format</em></div>' + this.newLine;
        out += this.tab + this.tab + '<div class="clearfix"></div>' + this.newLine;
        out += this.tab + '</div>' + this.newLine;
        out += this.tab + '<div id="jsGrid" class="table-responsive kv-grid-container"></div>' + this.newLine;
        out += '</div>' + this.newLine;

        return out;
    }

    this.outputViewsGrid = function () {

        var out = '<script>' + this.newLine;
        out += this.tab + '$("#jsGrid").jsGrid({' + this.newLine;
        out += this.tab + this.tab + 'width: "100%",' + this.newLine;
        out += this.tab + this.tab + 'filtering: true,' + this.newLine;
        out += this.tab + this.tab + 'inserting: false,' + this.newLine;
        out += this.tab + this.tab + 'editing: true,' + this.newLine;
        out += this.tab + this.tab + 'sorting: false,' + this.newLine;
        out += this.tab + this.tab + 'autoload: true,' + this.newLine;
        out += this.tab + this.tab + 'paging: true,' + this.newLine;
        out += this.tab + this.tab + 'pageLoading: true,' + this.newLine;
        out += this.tab + this.tab + 'css: "kv-grid-table table table-bordered table-striped kv-table-wrap",' + this.newLine;
        out += this.tab + this.tab + 'pageSize: 20,' + this.newLine;
        out += this.tab + this.tab + 'pageButtonCount: 10,' + this.newLine;
        out += this.tab + this.tab + 'deleteConfirm: "Do you really want to delete client?",' + this.newLine;
        out += this.tab + this.tab + this.tab + 'controller: {' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + 'loadData: function (filter) {' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + 'return $.ajax({' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + 'datatype: "json",' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + 'type: "GET",' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + 'url: "/' + table + '/list",' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + 'data: filter,' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + 'success: function (html) {' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + 'var pi = filter.pageIndex || pageIndex; var ps = filter.pageSize || pageSize; var showing = "Showing <b>"; var pis = (pi * ps);var i = ((pi-1) * ps) +1;showing += i+" - "+pis;showing += "</b> of " + html.itemsCount;$(".summary").html(showing);$(".jsgrid-pager-container").addClass("paginaton");' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + '}' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + '});' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '},' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + 'updateItem: function (item) {return $.ajax({type: "PUT",url: "/' + table + '",data: item});},' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + 'deleteItem: function (item) {return $.ajax({type: "DELETE",url: "/' + table + '",data: item});}' + this.newLine;
        out += this.tab + this.tab + this.tab + '},' + this.newLine;
        out += this.tab + this.tab + this.tab + 'fields: [' + this.newLine;

        var keys = this.keys();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != "id")
                out += this.tab + this.tab + this.tab + this.tab + '{name:"' + keys[i] + '", title:"' + this.capitalizeFirstLetter(keys[i]) + '", type: "text", width: 90},' + this.newLine;
        }
        out += this.tab + this.tab + this.tab + this.tab + '{type: "control", width: 100, editButton: false,' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + 'itemTemplate: function (value, item) {' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + 'var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + 'var $customViewButton = $("<button>").attr({class: "btn btn-info btn-xs"}).html("<span class=\'glyphicon glyphicon-eye-open\'></span>").click(function (e) {location.href = "/' + table + '/view/" + item.id; e.stopPropagation();});' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + 'var $customEditButton = $("<button>").attr({class: "btn btn-success btn-xs"}).html("<span class=\'glyphicon glyphicon-pencil\'></span>").click(function (e) {location.href = "/' + table + '/update/" + item.id; e.stopPropagation();});' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + 'var $customDeleteButton = $("<button>").attr({class: "btn btn-danger btn-xs"}).html("<span class=\'glyphicon glyphicon-trash\'></span>").click(function (e) { if(window.confirm("delete selected data ?")){$.ajax({url:"/' + table + '/"+item.id,type:"DELETE",data:{id:item.id},success:function(data){location.href="";}});};e.stopPropagation();});' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + 'return $("<div>").append($customViewButton).append("   ").append($customEditButton).append("    ").append($customDeleteButton);' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab + '}' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '}' + this.newLine;

        out += this.tab + this.tab + this.tab + ']' + this.newLine;
        out += this.tab + this.tab + '});' + this.newLine;


        out += '</script>';

        return out;
    }

    this.outputViewsView = function () {

        var keys = this.keys();
        var out = '';
        out += '<div class="page-header">' + this.newLine;
        out += this.tab + "<h1>" + this.capitalizeFirstLetter(table)  + " <%= data.model.id %> </h1>" + this.newLine;
        out += "</div>" + this.newLine + this.newLine;

        out += '<table class="table table-striped table-responsive">' + this.newLine;
        out += this.tab + '<tbody>' + this.newLine;

       for (var i = 0; i < keys.length; i++) {
            out += this.tab + this.tab + '<tr>' + this.newLine;
            out += this.tab + this.tab + this.tab + '<th>' + this.newLine;
            out += this.tab + this.tab + this.tab + this.capitalizeFirstLetter(keys[i]) + this.newLine;
            out += this.tab + this.tab + this.tab + '</th>' + this.newLine;
            out += this.tab + this.tab + this.tab + '<td>' + this.newLine;
            out += this.tab + this.tab + this.tab + '<%= data.model.' + keys[i] + ' %>' + this.newLine;
            out += this.tab + this.tab + this.tab + '</td>' + this.newLine;
            out += this.tab + this.tab + '</tr>' + this.newLine;
        }
        out += this.tab + '</tbody>' + this.newLine;
        out += '</table>' + this.newLine;

        return out;
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
        type = type.replace("unsigned", "");
        type = type.trim();
        var s = 'bigint';
        var tiny = 'tinyint';
        var date = 'date';
        var r;

        if (type.indexOf(s) >= 0) {
            r = t;
        } else if (type.indexOf(tiny) >= 0) {
            r = type.replace(tiny, "INTEGER");
        } else {
            var find = ["int", "varchar", "char", "timestamp", "datetime", "date", "mediumtext"];
            var replace = ["INTEGER", "STRING", "STRING", "DATE", "DATE", "DATEONLY", "TEXT"];
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

    this.createDir = function (dir, callback) {
        callback = callback || function () {
            }

        return new Promise(function (resolve, reject) {
            fs.stat(dir, function (err, stats) {
                if (err) {
                    // Directory doesn't exist or something.
                    console.log('Folder doesn\'t exist, so I made the folder ');
                    fs.mkdir(dir);

                    resolve(dir);
                    return callback(null, dir);
                }


                resolve(dir);
                return callback(null, dir);
            });
        });

    }

}

module.exports = Generator;