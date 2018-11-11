var _ = require("underscore");
var page = require("../containers/page");
var title = require("../containers/title");
var tabs = require("../containers/tabs");
var tab_focus = require("../containers/tab-focus");
var hero = require("../containers/hero");
var content = require("../containers/content");
var layer = require("../containers/layer");
var details = require("../containers/details");
var src = require("../containers/src");
var alt = require("../containers/alt");
var tile = require("../containers/tile");
var footbar = require("../containers/footbar");
var img = require("../containers/img");
var css = require("../containers/css");
var js = require("../containers/js");
var controller = require("../controllers/controller");

// List of routers
module.exports = {
    "index": page(title("Leukemia")),
    "test": page(title("Leukemia")),
    "api-contact-list": function(app) {
        app.get(controller.getContacts) // GET endpoint
           .post(controller.addNewContact); // POST endpoint
    },
    "api-contact-details-by-id": function(app) {
        // Contact detail
        app.get(controller.getContactWithID)
            .put(controller.updateContact)
            .delete(controller.deleteContact);
   
    }
};
