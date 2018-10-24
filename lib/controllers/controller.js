var mongoose = require('mongoose');
var model = require('../models/model');
var Contact = mongoose.model('Contact', model);
var Controller = (function() {
    function Controller() {}
    Controller.prototype.addNewContact = function(req, res) {
        var newContact = new Contact(req.body);
        newContact.save(function(err, contact) {
            if (err) { res.send(err); }
            // Create new contact         
            res.status(200).send({
                message: 'POST request successfulll!!!!'
            });
            res.json(contact);
        });
    };
    Controller.prototype.getContacts = function(req, res) {
        Contact.find({}, function(err, contact) {
            if (err) { res.send(err); }
            // Get all contacts            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
            res.json(contact);
        });
    };
    Controller.prototype.getContactWithID = function(req, res) {
        Contact.findById(req.params.contactId, function(err, contact) {
            if (err) { res.send(err); }
            // Get a single contact detail            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
            res.json(contact);
        });
    };
    Controller.prototype.updateContact = function(req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, function(err, contact) {
            if (err) { res.send(err); }
            // Update a contact           
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            });
            res.json(contact);
        });
    };
    Controller.prototype.deleteContact = function(req, res) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) { res.send(err); }
            // Delete a contact     
            res.status(200).send({
                message: 'DELETE request successfulll!!!!'
            });
            res.json({ message: 'Successfully deleted contact!' });
        });
    };

    return Controller;
}());

   console.log(Controller)
exports = Controller;
