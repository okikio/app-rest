var Controller = require("../controllers/controller");
var params = ['firstName', 'lastName', 'email', 'company', 'phone', 'created_date']; 
var Routes = (function() {
    function Routes() {
        this.contactController = new Controller();
    }
    Routes.prototype.routes = function(app) {
        app.route('/')
            .get(function(req, res) {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                });
            });
            
        // Contact details by param
        app.route('/contact?firstName=:firstName&lastName=:lastName&email=:email&company=:company&phone=:phone&created_date=:created_date')
            // get specific contact
            .get(this.contactController.getContactParam(params))
            .put(this.contactController.updateContactParam(params))
            .delete(this.contactController.deleteContactParam(params));
           
        // Contact details by param
        app.route('/contact?firstName=:firstName')
            // get specific contact
            .get(this.contactController.getContactParam(['firstName']))
            .put(this.contactController.updateContactParam(['firstName']))
            .delete(this.contactController.deleteContactParam(['firstName']));
   
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
module.exports = Routes;
