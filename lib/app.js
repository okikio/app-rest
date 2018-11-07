var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var routes = require("./routes/route");
var private = process.env;
var App = (function() {
    function App() {
        this.mongoUrl = 'mongodb://' + private.user + ':' + private.password + '@ds029640.mlab.com:29640/rest-api';
        this.routePrv = new routes();
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    App.prototype.mongoSetup = function() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    };
    return App;
}());
module.exports = new App().app;
