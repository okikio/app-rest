var Controller = require("../controllers/controller");
var contactController = new Controller();
var Routes = (function() {
    function Routes() {}
    Routes.prototype.routes = function(app) {
        app.route('/')
            .get(function(req, res) {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                });
            });
   
        // Contact 
        app.route('/contact')
            // GET endpoint 
            .get(this.contactController.getContacts)
            // POST endpoint
           .post(this.contactController.addNewContact);
           
        // Contact detail
        app.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    };
    return Routes;
}());
exports = Routes;
