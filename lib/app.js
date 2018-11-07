var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var routes = require("./routes/route");
var private = process.env.DEV ? require("/private.json") : process.env;
// https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-4-954c8c059cd4
// https://github.com/dalenguyen/rest-api-node-typescript/blob/master/lib/routes/crmRoutes.ts
// https://rest-api-whitelighting.c9users.io/contact?firstName=Dale&lastName=Nguyen&email=dale@dalenguyen.me&phone=6576209999&company=Techcater
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
