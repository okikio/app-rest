var _ = require("underscore");
var title = require("./title");
var tabs = require("./tabs");
var tab_focus = require("./tab-focus");
var footbar = require("./footbar");
var hero = require("./hero");
var content = require("./content");
var css = require("./css");
var js = require("./js");

// Shared similarites between page containers
module.exports = function(/* ...args */) {
    var defaults = _.extend({}, title(), tabs(), tab_focus(), footbar(), hero(), content(), css(), js());
    var containers = _.extend.apply(null, 
        [{}].concat(_.toArray(arguments)) 
    );
    
    return _.extend({}, defaults, containers);
};
