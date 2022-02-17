var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var logger = require('morgan');
var ejs = require("ejs");
var compress = require('compression');
var _ = require("underscore");

// List of routers 
var Router = require('./util/router');
var app = express();

// List of routes and routers
var routes = require("./render.min");
var routeList = routes["routes"];
var routers = routes["routers"];

// Compress/GZIP Server
app.use(compress());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('view cache', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// For database access
const mongoUrl =
    "mongodb+srv://okikio:" +
    process.env.atlasPassword +
    "@democluster.akqec.mongodb.net/rest-api?retryWrites=true&w=majority";
// mongoUrl = 'mongodb://' + process.env.user + ':' + process.env.password + '@ds029640.mlab.com:29640/rest-api';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverApi: ServerApiVersion.v1,
});

// Set route to routers 
_.each(routeList, function(_router, route, obj) {
    if (_.isFunction(routers[_router])) {
        routers[_router](app.route(route));
    } else {
        app.use(route, Router(routers, _router));
    }
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('template/error');
});

module.exports = app;
