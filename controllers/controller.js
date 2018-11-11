var mongoose = require('mongoose');
var model = require('../models/model');
var Contact = mongoose.model('Contact', model);
module.exports = {
    addNewContact: function(req, res) {
        var newContact = new Contact(req.body);
        newContact.save(function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    },
    getContacts: function(req, res) {
        Contact.find({}, function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    },
    getContactWithID: function(req, res) {
        Contact.findById(req.params.contactId, function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    },
    updateContact: function(req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    },
    deleteContact: function(req, res) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) { res.send(err); }
            res.json({ message: 'Successfully deleted contact!' });
        });
    }
};
