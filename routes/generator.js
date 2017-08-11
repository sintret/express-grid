var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
const Sequelize = require('sequelize');
var sequelize = require('./../models/config.js');

String.prototype.replaceArray = function (find, replace) {
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

function tableArray(arr) {
    var r = [];
    var tables = arr[0];

    for (i = 0; i < tables.length; i++) {
        for (obj in tables[i]) {
            r.push(tables[i][obj]);
        }
    }

    return r;
}

function content(arr) {
    var spaces = '   ';
    var c = '';
    var tab = '\t';
    var e = '\r';
    var fields = arr[0];
    var keys = [];
    var txt = '';
    c+= "const Sequelize = require('sequelize');";
    c+= e;
    c+= "var sequelize = require('./config.js');";
    c+= e;
    c+= e;
    c+= 'var attributeData = {';

    for (i = 0; i < fields.length; i++) {

        c += extract(fields[i]);
    }
    c+= '}';

    return c;
}


function extract(obj) {
    var tab = '\t';
    var e = '\r';
    var fieldName = obj['Field'];
    var s = fieldName + ':{';
    s += tab;
    s += e;
    s += getType(obj['Type']) +',';
    if (obj.Null == "NO") {
        s += e;
        s += 'allowNull: true,';
    } else {
        s += e;
        s += 'allowNull: false,';
    }
    s += e;
    s += '},';

    return s;
}

function getType(t) {
    var tab = '\t';
    var e = '\r';
    t = t.toLowerCase();
    var s = 'bigint';
    var r = '';

    if (t.indexOf(s) >= 0) {
        r = t;
    } else {
        var find = ["int", "varchar", "char", "timestamp"];
        var replace = ["INTEGER", "STRING", "STRING", "DATE"];
        r = t.replaceArray(find,replace);
    }

    return "type: Sequelize." + r.toUpperCase();
}

/* GET tables listing. */
router.get('/', function (req, res, next) {
    sequelize.query('show tables').then(function (rows) {
        console.log(JSON.stringify(rows));

        res.render("generator/index", {rows: tableArray(rows)});
    })
});

router.post('/', function (req, res, next) {

    var table = req.body.table;
    sequelize.query('DESCRIBE ' + table).then(function (rows) {
        console.log(JSON.stringify(rows));

        var fs = require('fs');
        var p = process.env.PWD + "./../models/"+table+".js";
        fs.writeFile(p, content(rows), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        res.json(rows);
        //res.render("generator/describe", {rows: tableArray(rows)});
    })
    /* var SequelizeAuto = require('sequelize-auto')
     var auto = new SequelizeAuto('chat', 'root', '', {
     host: 'localhost',
     dialect: 'mysql',
     directory: false, // prevents the program from writing to disk
     port: 3306,
     additional: {
     timestamps: false
     //...
     },
     tables: [table]
     //...
     })

     auto.run(function (err) {
     if (err) throw err;

     console.log(auto.tables); // table list
     console.log(auto.foreignKeys); // foreign key list

     res.redirect("/generator");
     });
     */

});


router.get('/describe', function (req, res, next) {
    sequelize.query('DESCRIBE faq').then(function (rows) {
        console.log(JSON.stringify(rows));

        res.json(rows);
        //res.render("generator/describe", {rows: tableArray(rows)});
    })
})

module.exports = router;