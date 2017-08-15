var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var Multer = require('multer');
const sharp = require('sharp');
//get absolute path
global.appRoot = path.resolve(__dirname);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1); // trust first proxy
var session = expressSession({
    secret: 'gstartupProject',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: false}
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(session);

var storage = Multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, './uploads');
    },
    filename : function(req,file,callback) {
        callback(null, file.fieldname + '-' + Date.now());

    }
});

var upload = Multer({storage: storage}).single('songUpload');


app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.renderBody = "";
    res.locals.renderEnd = "";
    res.locals.data = "";
    res.locals.title = "my app";

    console.log(JSON.stringify(req.body));

    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/generator', require('./routes/generator'));
app.use('/company', require('./routes/company'));
app.use('/employee', require('./routes/employee'));
app.use('/member', require('./routes/member'));
app.use('/factories', require('./routes/factories'));
app.use('/department', require('./routes/department'));
app.use('/bank', require('./routes/bank'));

/*
 app.use('/php', require('./routes/php'));
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
