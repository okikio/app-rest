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

// Setup `.env` file
var dotenv = require('dotenv');
var env = dotenv.config();
if (env.error) { throw env.error; }

// List of routers 
var Router = require('./util/router');
var app = express();

// List of routes and routers
var routes = require("./render.min");
var routeList = routes["routes"];
var routers = routes["routers"];

// For database access
var private, mongoUrl;
process.env['NODE_ENV'] = 'production';

// Compress/GZIP Server
app.use(compress());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
// app.set('view cache', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

private = env.parsed;
mongoUrl = 'mongodb://' + private.user.toString() + ':' + private.password.toString() + '@ds029640.mlab.com:29640/rest-api';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

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

/*
const PORT = process.env.PORT;

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var routes = require("./routes/route");
var private = process.env;
        this.mongoUrl = 'mongodb://' + private.user + ':' + private.password + '@ds029640.mlab.com:29640/rest-api';
        this.routePrv = new routes();
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.routePrv.routes(this.app);
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);

app.listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
    }) */
// https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
// https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
// https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
module.exports = app;
