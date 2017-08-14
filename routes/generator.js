var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
const Sequelize = require('sequelize');
var sequelize = require('./../models/config.js');
var Generator = require('./../components/Generator');
var fs = require('fs');

/* GET tables listing. */
router.get('/', function (req, res, next) {
    sequelize.query('show tables').then(function (rows) {
        var g = new Generator([]);
        console.log(JSON.stringify(g.tableArray(rows)));

        res.render("generator/index", {rows: g.tableArray(rows)});
    })
});

router.post('/', function (req, res, next) {

    var table = req.body.table;
    sequelize.query('DESCRIBE ' + table).then(function (rows) {
        console.log(JSON.stringify(rows));

        var fs = require('fs');
        var fileModel = appRoot + "/models/" + table + ".js";
        var g = new Generator(rows, table, appRoot);
        fs.writeFile(fileModel, g.outputModel(), function (err) {
            if (err) {
                return console.log(g.outputModel());
            }

            console.log("The file models was saved!");
        });

        var fileRoutes = appRoot + "/routes/" + table + ".js";
        fs.writeFile(fileRoutes, g.outputRoutes(), function (err) {
            if (err) {
                return console.log(g.outputRoutes());
            }

            console.log("The file routes was saved!");
        });

        var dirViews = appRoot + "/views/" + table;
        mkdirp(dirViews, function (err) {
            if (err) {
                console.error(err);
            } else {
                var index = dirViews + "/index.ejs";
                fs.writeFile(index, g.outputViewsIndex(), function (err) {
                    if (err) {
                        return console.log(g.outputViewsIndex());
                    }
                });

                var grid = dirViews + "/grid.ejs";
                fs.writeFile(grid, g.outputViewsGrid(), function (err) {
                    if (err) {
                        return console.log(g.outputViewsGrid());
                    }
                });

                var view = dirViews + "/view.ejs";
                fs.writeFile(view, g.outputViewsView(), function (err) {
                    if (err) {
                        return console.log(g.outputViewsView());
                    }
                });

                var create = dirViews + "/form.ejs";
                fs.writeFile(create, g.outputViewsCreate(), function (err) {
                    if (err) {
                        return console.log(g.outputViewsCreate());
                    }
                });
            }
        })


        res.json(rows);
        //res.render("generator/describe", {rows: tableArray(rows)});
    })
});


router.get('/describe', function (req, res, next) {
    sequelize.query('DESCRIBE faq').then(function (rows) {
        console.log(JSON.stringify(rows));

        res.json(rows);
    })
})

module.exports = router;