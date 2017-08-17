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

        var keys = this.keys();
        var obj = {}
        var out = '';
        out += "const Sequelize = require('sequelize');" +this.newLine;
        out += "var sequelize = require('./config.js');"+this.newLine;
        out += this.attributeData()+this.newLine+this.newLine;

        out += 'var model = sequelize.define("' + table + '", attributeData, {'+this.newLine;
        out += this.tab + 'timestamps: false'+this.newLine;
        out += '});'+this.newLine;
        out += 'model.attributeData = ' + JSON.stringify(this.obj()).replace(/"/g, '') + ';'+this.newLine;
        out += 'model.keys = ' + JSON.stringify(keys) + ';'+this.newLine;

        for(var property in this.obj()){
            obj[property]=null;
        }

        out += 'model.newEmpty = ' + JSON.stringify(obj).replace(/"/g, '') + ';';
        out += this.newLine;
        out += this.newLine + this.newLine;
        out += this.grid();
        out += this.newLine;
        out += 'model.insertData = function (data,callback) {'+this.newLine;
        out += this.tab + 'callback = callback || function () {}'+this.newLine+this.newLine;
        out += this.tab + 'return new Promise(function (resolve, reject) {'+this.newLine;
        out += this.tab + this.tab + 'model.create(data).then(function (x) {'+this.newLine;
        out += this.tab + this.tab + this.tab + 'var json = {};json.status=1;json.data=x;resolve(json);'+this.newLine;
        out += this.tab + this.tab + '}).catch(Sequelize.ValidationError, function (err) {'+this.newLine;
        out += this.tab + this.tab + this.tab + 'var json = {};json.status=0;json.data=err;reject(json);'+this.newLine;
        out += this.tab + this.tab + '});'+this.newLine;
        out += this.tab + '});'+this.newLine;
        out += '}'+this.newLine;


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
        out += "var " + this.capitalizeFirstLetter(table) + " = require('./../models/" + table + "');" + this.newLine
        out += "var Util = require('./../components/Util');"+ this.newLine
        out += "var Excel = require('exceljs');" + this.newLine + this.newLine

        out += "/* GET " + table + " listing. */" + this.newLine;

        //index controller
        out += "router.get('/', function (req, res, next) {" + this.newLine;
        out += this.tab + 'res.render("layouts/main", {' + this.newLine;
        out += this.tab + this.tab + 'data: {table:"' + table + '", attributeData:' + this.capitalizeFirstLetter(table) + '.attributeData},' + this.newLine;
        out += this.tab + this.tab + 'renderBody: "' + table + '/index.ejs",' + this.newLine;
        out += this.tab + this.tab + 'renderEnd: "' + table + '/grid.ejs"' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '});' + this.newLine+ this.newLine;

        //list via grid controller / load data
        out += "router.get('/list', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + ".getGridFilter(req.query).then(function (items) {" + this.newLine;
        out += this.tab + this.tab + "res.json(items);" + this.newLine;
        out += this.tab + "});" + this.newLine;
        out += "});" + this.newLine+ this.newLine;

        //delete controller
        out += "router.delete('/:id', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + ".destroy({" + this.newLine;
        out += this.tab + this.tab + "where: {id: req.params.id}" + this.newLine;
        out += this.tab + "}).then(function (deletedOwner) {" + this.newLine;
        out += this.tab + this.tab + "res.json(deletedOwner);" + this.newLine;
        out += this.tab + "});" + this.newLine;
        out += "});" + this.newLine+ this.newLine;

        //view controller
        out += "router.get('/view/:id', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + ".findById(req.params.id).then(function (model) {" + this.newLine;
        out += this.tab + this.tab + 'res.render("layouts/main", {' + this.newLine;
        out += this.tab + this.tab + this.tab + 'data: {model:model, attributeData: ' + this.capitalizeFirstLetter(table) + '.attributeData},' + this.newLine;
        out += this.tab + this.tab + this.tab + 'renderBody: "' + table + '/view.ejs"' + this.newLine;
        out += this.tab + this.tab + '});' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '});' + this.newLine+ this.newLine;

        //create controller
        out += "router.get('/create', function (req, res, next) {" + this.newLine;
        out += this.tab + 'res.render("layouts/main", {' + this.newLine;
        out += this.tab + this.tab + 'data: {model:' + this.capitalizeFirstLetter(table) + '.newEmpty, attributeData: ' + this.capitalizeFirstLetter(table) + '.attributeData},' + this.newLine;
        out += this.tab + this.tab + 'renderBody: "' + table + '/create.ejs"' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '});' + this.newLine+ this.newLine;

        //post create controller
        out += "router.post('/create', function (req, res, next) {" + this.newLine ;
        out += this.tab +  this.capitalizeFirstLetter(table) + '.insertData(req.body).then(function (data) {' + this.newLine;
        out += this.tab + this.tab + 'res.json(data);' + this.newLine;
        out += this.tab + '}).catch(function (err) {' + this.newLine;
        out += this.tab + this.tab + 'res.json(err);' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '});' + this.newLine+ this.newLine;


        //update controller
        out += "router.get('/update/:id', function (req, res, next) {" + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) + '.findById(req.params.id).then(function (model) {' + this.newLine;
        out += this.tab + this.tab + 'res.render("layouts/main", {' + this.newLine;
        out += this.tab + this.tab + this.tab + 'data: {model: model, attributeData: ' + this.capitalizeFirstLetter(table) + '.attributeData},' + this.newLine;
        out += this.tab + this.tab + this.tab + 'renderBody: "'+table+'/update.ejs"' + this.newLine;
        out += this.tab + this.tab + '});' + this.newLine;
        out += this.tab + '}).catch(function (error) {' + this.newLine;
        out += this.tab + this.tab + 'var data = {}' + this.newLine;
        out += this.tab + this.tab + 'data.status = 0; data.data = error;' + this.newLine;
        out += this.tab + this.tab + 'res.json(data);' + this.newLine;
        out += this.tab + '});' + this.newLine;
        out += '});' + this.newLine+ this.newLine;

        //post update controller
        out += "router.post('/update/:id', function (req, res, next) {" + this.newLine ;
        out += this.tab + 'var data = {};' + this.newLine;
        out += this.tab + this.capitalizeFirstLetter(table) +  '.findById(req.params.id).then(function (model) {' + this.newLine;
        out += this.tab + this.tab + 'model.update(req.body, {where: {id: req.params.id}}).then(function (cb) {' + this.newLine;
        out += this.tab + this.tab + this.tab + 'data.status = 1; data.data = cb' + this.newLine;
        out += this.tab + this.tab + this.tab + 'res.json(data);' + this.newLine;
        out += this.tab + this.tab + '}).catch(function (error) {' + this.newLine;
        out += this.tab + this.tab + this.tab + 'data.status = 0;data.data = error;' + this.newLine;
        out += this.tab + this.tab + this.tab +'res.json(data);' + this.newLine;
        out +=  this.tab + this.tab + '});' + this.newLine;
        out +=  this.tab + '}).catch(function (error) {' + this.newLine;
        out +=  this.tab + this.tab + 'data.status = 0; data.data = error;' + this.newLine;
        out +=  this.tab + this.tab + 'res.json(data);' + this.newLine;
        out +=  this.tab + this.tab + '});' + this.newLine;
        out +=  this.tab + '});' + this.newLine+ this.newLine;


        //download excel file via grid
        out +=  "router.get('/excel', function (req, res, next) {" + this.newLine + this.newLine;
        out +=  this.tab + "var workbook = new Excel.Workbook();" +this.newLine;
        out +=  this.tab + "var worksheet = workbook.addWorksheet('"+this.capitalizeFirstLetter(table)+"', {pageSetup: {paperSize: 9, orientation: 'landscape'}});" +this.newLine;
        out +=  this.tab + "var sequence = Util.excelSequence();" +this.newLine;
        out +=  this.tab + "var fields = "+this.capitalizeFirstLetter(table)+".keys;" +this.newLine;
        out +=  this.tab + "var start = 3, num = 1;" + this.newLine + this.newLine;
        out +=  this.tab + "worksheet.getCell('A1').value = '#';" + this.newLine + this.newLine;
        out +=  this.tab + this.capitalizeFirstLetter(table)+".getGridFilter(req.query).then(function (items) {" + this.newLine + this.newLine;
        out +=  this.tab + this.tab + "var models = items.data;" +this.newLine;
        out +=  this.tab + this.tab + "for (var i = 0; i < fields.length; i++) {" +this.newLine;
        out +=  this.tab + this.tab + this.tab + "var j = i + 1;" +this.newLine;
        out +=  this.tab + this.tab + this.tab + "worksheet.getCell(sequence[j] + '1').value = Util.capitalizeFirstLetter(fields[i]);" +this.newLine;
        out +=  this.tab + this.tab + "}" + this.newLine + this.newLine;
        out +=  this.tab + this.tab + "models.forEach(function (result) {" +this.newLine;
        out +=  this.tab + this.tab + this.tab + "for (var i = 0; i < fields.length; i++) {" +this.newLine;
        out +=  this.tab + this.tab + this.tab + this.tab + "var j = i + 1;" +this.newLine;
        out +=  this.tab + this.tab + this.tab + this.tab + "worksheet.getCell('A' + start).value = num;" +this.newLine;
        out +=  this.tab + this.tab + this.tab + this.tab + "worksheet.getCell(sequence[j] + start).value = result[fields[i]];" +this.newLine;
        out +=  this.tab + this.tab + this.tab + "}" +this.newLine;
        out +=  this.tab + this.tab + this.tab + "start++;" +this.newLine;
        out +=  this.tab + this.tab + this.tab + "num++" +this.newLine;
        out +=  this.tab + this.tab + "});" +this.newLine +this.newLine;
        out +=  this.tab + this.tab + "var filePath = appRoot + '/temp/';" +this.newLine;
        out +=  this.tab + this.tab + "var fileName = '"+table+".xlsx';" +this.newLine;
        out +=  this.tab + this.tab + "workbook.xlsx.writeFile(filePath + fileName).then(function () {res.download(filePath + fileName);});" +this.newLine;
        out +=  this.tab + "}).catch(function (err) {res.json(err);});" +this.newLine;
        out +=  "});" +this.newLine;

        out += "module.exports = router;" + this.newLine;

        return out;
    }

    this.outputViewsIndex = function () {

        var out = '';
        out += '<nav class="breadcrumb pull-right">' + this.newLine;
        out += this.tab + '<a class="breadcrumb-item" href="/">Home</a> /' + this.newLine;
        out += this.tab + '<span class="breadcrumb-item active">Index</span>' + this.newLine;
        out += '</nav>' + this.newLine + this.newLine;
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
        out += this.tab + this.tab + this.tab + this.tab + '<a type="button" id="backupExcel" href="/'+table+'/excel" class="btn btn-default" title="Excel Backup"><i class="fa fa-download"></i></a>' + this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + '<a class="btn btn-default" href="/' + table + '" title="Refresh Grid" ><i class="glyphicon glyphicon-repeat"></i></a></div>' + this.newLine;

        out += this.tab + this.tab + this.tab + '<div class="btn-group"><select id="pageSize" class="form-control"><option selected value="50">50</option><option value="100">100</option><option value="300">300</option> </select> </div>' + this.newLine;
        out += this.tab + this.tab + this.tab + '<div class="btn-group">' + this.newLine;
        out += this.tab + this.tab + this.tab + '<button id="w9" class="btn btn-default dropdown-toggle" title="Export" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-share-square-o"></i>  <span class="caret"></span></button>' + this.newLine;
        out += this.tab + this.tab + this.tab + '<ul id="w10" class="dropdown-menu dropdown-menu-right"><li role="presentation" class="dropdown-header">Export Page Data</li><li title="Microsoft Excel 95+"><a class="export-xls" href="#" ><i class="text-success fa fa-file-excel-o"></i> Excel</a></li><li title="Portable Document Format"><a class="export-pdf" href="#"><i class="text-danger fa fa-file-pdf-o"></i> PDF</a></li></ul>' + this.newLine;
        out += this.tab + this.tab + this.tab + '</div>' + this.newLine;
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
        out += this.tab + 'var attributeData = <%- JSON.stringify(data.attributeData) %>;' + this.newLine;
        out += this.tab + 'var jsFilter = "";' + this.newLine;
        out += this.tab + '$("#jsGrid").jsGrid({' + this.newLine;
        out += this.tab + this.tab + 'width: "100%",' + this.newLine;
        out += this.tab + this.tab + 'filtering: true,' + this.newLine;
        out += this.tab + this.tab + 'inserting: false,' + this.newLine;
        out += this.tab + this.tab + 'editing: true,' + this.newLine;
        out += this.tab + this.tab + 'sorting: true,' + this.newLine;
        out += this.tab + this.tab + 'autoload: true,' + this.newLine;
        out += this.tab + this.tab + 'paging: true,' + this.newLine;
        out += this.tab + this.tab + 'pageLoading: true,' + this.newLine;
        out += this.tab + this.tab + 'css: "kv-grid-table table table-bordered table-striped kv-table-wrap",' + this.newLine;
        out += this.tab + this.tab + 'pageSize: $("#pageSize").val(),' + this.newLine;
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
        out += this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + this.tab + 'var pi = filter.pageIndex || pageIndex; var ps = filter.pageSize || pageSize; var showing = "Showing <b>"; var pis = (pi * ps);var i = ((pi-1) * ps) +1;showing += i+" - "+pis;showing += "</b> of " + html.itemsCount;$(".summary").html(showing);$(".jsgrid-pager-container").addClass("paginaton");jsFilter = filter;' + this.newLine;
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
                out += this.tab + this.tab + this.tab + this.tab + '{name : "' + keys[i] + '", title : attributeData.' + keys[i] + ', type: "text", width: 90},' + this.newLine;
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
        out += this.tab + this.tab + '});' + this.newLine+ this.newLine;

        out += this.tab + '$(".export-xls").on("click", function () {location.href="/'+table+'/excel?"+jQuery.param(jsFilter);});' + this.newLine;
        out += this.tab + '$("#pageSize").on("change", function () {$("#jsGrid").jsGrid("option", "pageSize", $(this).val());});' + this.newLine;


        out += '</script>';

        return out;
    }

    this.outputViewsView = function () {

        var keys = this.keys();
        var out = '';
        out += '<nav class="breadcrumb pull-right">' + this.newLine;
        out += this.tab + '<a class="breadcrumb-item" href="/">Home</a> /' + this.newLine;
        out += this.tab + '<a class="breadcrumb-item" href="/' + table + '">Index</a> /' + this.newLine;
        out += this.tab + '<span class="breadcrumb-item active">View</span>' + this.newLine;
        out += '</nav>' + this.newLine + this.newLine;

        out += '<div class="page-header">' + this.newLine;
        out += this.tab + "<h1>" + this.capitalizeFirstLetter(table) + " <%= data.model.id %> </h1>" + this.newLine;
        out += "</div>" + this.newLine + this.newLine;

        out += '<table class="table table-striped table-responsive">' + this.newLine;
        out += this.tab + '<tbody>' + this.newLine;

        for (var i = 0; i < keys.length; i++) {
            out += this.tab + this.tab + '<tr>' + this.newLine;
            out += this.tab + this.tab + this.tab + '<th>' + this.newLine;
            out += this.tab + this.tab + this.tab + '<%= data.attributeData.' + keys[i] + ' %>' + this.newLine;
            out += this.tab + this.tab + this.tab + '</th>' + this.newLine;
            out += this.tab + this.tab + this.tab + '<td>' + this.newLine;
            out += this.tab + this.tab + this.tab + '<%- data.model.' + keys[i] + ' %>' + this.newLine;
            out += this.tab + this.tab + this.tab + '</td>' + this.newLine;
            out += this.tab + this.tab + '</tr>' + this.newLine;
        }
        out += this.tab + '</tbody>' + this.newLine;
        out += '</table>' + this.newLine;

        return out;
    }

    this.outputViewsCreate = function () {
        var out = '';
        out += '<nav class="breadcrumb pull-right">' + this.newLine;
        out += this.tab + '<a class="breadcrumb-item" href="/">Home</a> /' + this.newLine;
        out += this.tab + '<a class="breadcrumb-item" href="/' + table + '">Index</a> /' + this.newLine;
        out += this.tab + '<span class="breadcrumb-item active">Create Form</span>' + this.newLine;
        out += '</nav>' + this.newLine + this.newLine;

        out += '<div class="page-header">' + this.newLine;
        out += this.tab + "<h3>Create " + this.capitalizeFirstLetter(table) + " Form  </h3>" + this.newLine;
        out += "</div>" + this.newLine + this.newLine;

        out += '<% include ../' + table + '/form.ejs %>';

        return out;
    }

    this.outputViewsUpdate = function () {
        var out = '';
        out += '<nav class="breadcrumb pull-right">' + this.newLine;
        out += this.tab + '<a class="breadcrumb-item" href="/">Home</a> /' + this.newLine;
        out += this.tab + '<a class="breadcrumb-item" href="/' + table + '">Index</a> /' + this.newLine;
        out += this.tab + '<span class="breadcrumb-item active">Update Form</span>' + this.newLine;
        out += '</nav>' + this.newLine + this.newLine;

        out += '<div class="page-header">' + this.newLine;
        out += this.tab + "<h3>Update " + this.capitalizeFirstLetter(table) + " Form  </h3>" + this.newLine;
        out += "</div>" + this.newLine + this.newLine;

        out += '<% include ../' + table + '/form.ejs %>';

        return out;
    }

    this.outputViewsForm = function () {

        var keys = this.keys();

        var out = '';
        out += '<form id="'+table+'-form" method="post" action="/' + table + '/create" >' + this.newLine;

        var dataFields = this.dataFields();

        dataFields.forEach(function (key) {
            if (key.name != "id") {
                var type = key.type;
                var g = new Generator();

                var j = g.tab + '<div class="form-group div'+key.name+'">' + g.newLine;
                j += g.tab + g.tab + '<label for="' + key.name + '"><%= data.attributeData.' + key.name + ' %></label>' + g.newLine;
                if (type.indexOf("INTEGER") >= 0) {
                    j += g.tab + g.tab + '<select class="form-control" name="' + key.name + '" id="' + key.name + '">' + g.newLine;
                    j += g.tab + g.tab + g.tab + '<option value=""> -- </option>' + g.newLine;
                    j += g.tab + g.tab + '</select>' + g.newLine;

                } else if (type.indexOf("STRING") >= 0) {
                    j += g.tab + g.tab + '<input type="text" class="form-control" id="' + key.name + '" name="' + key.name + '" placeholder="' + g.capitalizeFirstLetter(key.name) + '" value="<%= data.model.' + key.name + '%>">' + g.newLine;

                } else if (type.indexOf("TEXT") >= 0) {
                    j += g.tab + g.tab + '<textarea class="form-control" id="' + key.name + '" name="' + key.name + '" rows="3"><%- data.model.' + key.name + '%></textarea>' + g.newLine;

                } else if (type.indexOf("DATEONLY") >= 0) {
                    j += g.tab + g.tab + '<input type="date" class="form-control" id="' + key.name + '" name="' + key.name + '" placeholder="' + g.capitalizeFirstLetter(key.name) + '" value="<%= data.model.' + key.name + '%>">' + g.newLine;

                } else if (type.indexOf("DATE") >= 0) {
                    j += g.tab + g.tab + '<input type="date" class="form-control" id="' + key.name + '" name="' + key.name + '" placeholder="' + g.capitalizeFirstLetter(key.name) + '" value="<%= data.model.' + key.name + '%>">' + g.newLine;

                } else {
                    j += g.tab + g.tab + '<input type="text" class="form-control" id="' + key.name + '" name="' + key.name + '" placeholder="' + g.capitalizeFirstLetter(key.name) + '" value="<%= data.model.' + key.name + '%>">' + g.newLine;

                }
                j += g.tab + '</div>' + g.newLine;


                out += j;
            }

        });

        out += ' <div class="form-group"><button id="'+table+'-submit" type="submit" class="btn btn-success">Submit</button></div>' + this.newLine;

        out += '</form>' + this.newLine+ this.newLine;

        out += '<% include formjs.ejs %>';

        return out;
    }

    this.outputViewsFormjs = function () {
        var out = '';
        out += '<script>'+ this.newLine;
        out += this.tab + 'var form = document.getElementById("'+table+'-form");'+ this.newLine;
        out += this.tab + 'form.onsubmit = function (ev) {'+ this.newLine;
        out += this.tab + this.tab +'ev.preventDefault();'+ this.newLine;
        out += this.tab + this.tab +'var url = window.location.pathname;'+ this.newLine;
        out += this.tab + this.tab +'$.ajax({'+ this.newLine;
        out += this.tab + this.tab + this.tab +"type: 'POST',"+ this.newLine;
        out += this.tab + this.tab + this.tab +"url: url,"+ this.newLine;
        out += this.tab + this.tab + this.tab +"data: $(this).serialize(),"+ this.newLine;
        out += this.tab + this.tab + this.tab +"success: function (data) {"+ this.newLine;
        out += this.tab + this.tab + this.tab + this.tab +"if (data.status == 1) {"+ this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + this.tab +'location.href = "/'+table+'/view/" + data.data.id;'+ this.newLine;
        out += this.tab + this.tab + this.tab + this.tab + "} else {"+ this.newLine;
        out += this.tab + this.tab + this.tab +"var errors = data.data.errors;"+ this.newLine;
        out += this.tab + this.tab + this.tab +"for (i = 0; i < errors.length; i++) {"+ this.newLine;
        out += this.tab + this.tab + this.tab + this.tab +"var path = errors[i]['path'];"+ this.newLine;
        out += this.tab + this.tab + this.tab + this.tab +"var message = errors[i]['message'];"+ this.newLine;
        out += this.tab + this.tab + this.tab + this.tab +"$('.div'+path).addClass('has-error');"+ this.newLine;
        out += this.tab + this.tab + this.tab + this.tab +"$('.div'+path).append('<div class=\"help-block\">' + message + '</div>');"+ this.newLine;
        out += this.tab + this.tab + this.tab +"}"+ this.newLine;
        out += this.tab + this.tab + "}"+ this.newLine;
        out += this.tab +"}"+ this.newLine;
        out += "});"+ this.newLine;
        out += "}"+ this.newLine;

        out += '</script>';

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

    this.dataFields = function () {
        var obj = [];
        for (var i = 0; i < this.fields.length; i++) {

            var o = this.fields[i];
            var t = [];
            t.name = o['Field'];
            if (o.Null == "NO") {
                t.allowNull = false;
            } else {
                t.allowNull = true;
            }

            t.type = this.setType(o["Type"]);

            obj.push(t);
        }

        return obj;
    }


    this.grid = function () {
        var out = '';
        out += 'model.getGridFilter = function (query, callback) {';
        out += this.newLine;
        out += this.tab + 'callback = callback || function () {}' + this.newLine;
        out += this.tab + 'var s = {};' + this.newLine;
        out += this.tab + 'var limit = parseInt(query.pageSize || 50);' + this.newLine;
        out += this.tab + 'var pageIndex = parseInt(query.pageIndex) || 1;' + this.newLine;
        out += this.tab + 'var offset = limit * (pageIndex - 1);' + this.newLine;
        out += this.tab + 'var sortField = query.sortField || "id";' + this.newLine;
        out += this.tab + 'var sortOrder = query.sortOrder || "DESC";' + this.newLine;
        out += this.tab + 'sortOrder = sortOrder.toUpperCase();' + this.newLine + this.newLine;
        out += this.tab + 'var keys = model.keys;' + this.newLine;
        out += this.tab + 'var o = {};' + this.newLine;
        out += this.tab + 'o.raw = true;' + this.newLine;
        out += this.tab + 'o.attributes = keys ;' + this.newLine;
        out += this.tab + 'o.limit = limit;' + this.newLine;
        out += this.tab + 'o.offset =offset;' + this.newLine + this.newLine;
        out += this.tab + 'o.order = [[sortField,sortOrder]];' + this.newLine + this.newLine;
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
        var validate = "";
        var s = '';
        var fieldName = this.tab + obj['Field'];
        s += fieldName + ': {';
        s += this.newLine;

        var sType = this.setType(obj['Type']);

        s += this.tab + this.tab + "type: Sequelize." + sType.toUpperCase() + ',';
        if (obj.Null == "NO") {
            s += this.newLine;
            s += this.tab + this.tab + 'allowNull: false,';
        } else {
            s += this.newLine;
            s += this.tab + this.tab + 'allowNull: true,';

            if (obj.Key != "PRI") {
                validate += "notEmpty: true,";
            }
        }


        if (sType.indexOf("INTEGER") >= 0 && obj.Key != "PRI") {
            validate += "isAlphanumeric: true,";
        }

        if (sType.indexOf("STRING") >= 0) {
            var numberPattern = /\d+/g;
            var num = sType.match(numberPattern);
            validate += "max: " + num + ",";
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

        if (validate != "") {
            validate = validate.slice(0, -1);
            s += this.newLine;
            s += this.tab + this.tab + 'validate: {' + validate + '}';
        }

        s += this.newLine;
        s += this.tab + '},';

        return s;
    }

    this.getType = function (type) {
        var r = this.setType(type);
        return this.tab + this.tab + "type: Sequelize." + r.toUpperCase();
    }

    this.setType = function (type) {
        type = type.toLowerCase();
        type = type.replace("unsigned", "");
        type = type.trim();
        var s = 'bigint';
        var tiny = 'tinyint';
        var date = 'date';
        var r;

        if (type.indexOf(s) >= 0) {
            r = type;
        } else if (type.indexOf(tiny) >= 0) {
            r = type.replace(tiny, "INTEGER");
        } else {
            var find = ["int", "varchar", "char", "timestamp", "datetime", "date", "mediumtext"];
            var replace = ["INTEGER", "STRING", "STRING", "DATE", "DATE", "DATEONLY", "TEXT"];
            r = type.replaceArray(find, replace);
        }

        return r;
    }


    this.obj = function () {
        var keys = this.keys();
        var obj = {}
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = "'"+this.capitalizeFirstLetter(keys[i])+"'";
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