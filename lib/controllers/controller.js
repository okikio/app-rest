var mongoose = require('mongoose');
var model = require('../models/model');
var Contact = mongoose.model('Contact', model);
var Controller = (function() {
    function Controller() {}
    Controller.prototype.addNewContact = function(req, res) {
        var newContact = new Contact(req.body);
        newContact.save(function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    };
    Controller.prototype.getContacts = function(req, res) {
        Contact.find({}, function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    };
    Controller.prototype.getContactWithID = function(req, res) {
        Contact.findById(req.params.contactId, function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    };
    Controller.prototype.updateContact = function(req, res) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, function(err, contact) {
            if (err) { res.send(err); }
            res.json(contact);
        });
    };
    Controller.prototype.deleteContact = function(req, res) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) { res.send(err); }
            res.json({ message: 'Successfully deleted contact!' });
        });
    };
    Controller.prototype.getContactParam = function (params) {
        return function(req, res) {
            var paramsObj = (params || []).reduce(function (acc, cur, i) {
                return req.params[i] ? acc[i] = req.params[i] : {}, acc;
            }, {});
            Contact.find(paramsObj, function(err, contact) {
                if (err) { res.send(err); }
                res.json(contact);
            });
        };
    };
    Controller.prototype.updateContactParam = function (params) {
        return function(req, res) {
            var paramsObj = (params || []).reduce(function (acc, cur, i) {
                return req.params[i] ? acc[i] = req.params[i] : {}, acc;
            }, {});
            
            Contact.findOneAndUpdate(paramsObj, req.body, { new: true }, function(err, contact) {
                if (err) { res.send(err); }
                res.json(contact);
            });
        };
    };
    Controller.prototype.deleteContactParam = function (params) {
        return function(req, res) {
            var paramsObj = (params || []).reduce(function (acc, cur, i) {
                return req.params[i] ? acc[i] = req.params[i] : {}, acc;
            }, {});
            
            Contact.remove(paramsObj, function(err, contact) {
                if (err) { res.send(err); }
                res.json({ message: 'Successfully deleted contact!' });
            });
        };
    };

    return Controller;
}());
module.exports = Controller;
