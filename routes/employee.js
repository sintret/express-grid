var express = require('express');
var router = express.Router();
var Employee = require('./../models/employee.js');

/* GET employee listing. */
router.get('/', function (req, res, next) {
    res.render("layouts/main", {
        renderBody: "employee/index.ejs",
        renderEnd: "employee/grid.ejs",
        data: {table: "employee"}
    });
});
router.get('/list', function (req, res, next) {
    Employee.getGridFilter(req.query).then(function (items) {
        res.json(items);
    });
});
router.delete('/:id', function (req, res, next) {
    const id = req.params.id;
    Employee.destroy({
        where: {id: id}
    }).then(function (deletedOwner) {
        res.json(deletedOwner);
    });
});
module.exports = router;
