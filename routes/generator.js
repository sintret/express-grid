var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
const Sequelize = require('sequelize');
var sequelize = require('./../models/config.js');

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


/* GET tables listing. */
router.get('/', function (req, res, next) {
    /*mkdirp(__dirname +'/../tmp/foo/bar/baz', function (err) {
     if (err) console.error(err)
     else console.log('pow!')
     });*/
    sequelize.query('show tables').then(function (rows) {
        console.log(JSON.stringify(rows));

        res.render("generator/index", {rows: tableArray(rows)});
    })
});

router.post('/', function (req, res, next) {

    var table = req.body.table;
    var SequelizeAuto = require('sequelize-auto')
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


});


router.get('/describe', function (req,res,next) {
    sequelize.query('DESCRIBE faq').then(function (rows) {
        console.log(JSON.stringify(rows));

        res.json(rows);
        //res.render("generator/describe", {rows: tableArray(rows)});
    })
})

module.exports = router;