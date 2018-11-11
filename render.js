var controller = require('./controllers/controller'); 
module.exports = {
    "routers": {
        "index": {
            "title": "Leukemia",
            "tabs": [
                "About",
                "Health Policies & Tech",
                "Connections",
                "References"
            ],
            "tab_focus": "Focus",
            "footbar": true,
            "hero": {
                "src": "/assets/images/city.jpg",
                "alt": "An iamge of a bustling city."
            },
            "content": {
                "layers": []
            },
            "css": [],
            "js": []
        },
        "test": {
            "title": "Leukemia",
            "tabs": [
                "About",
                "Health Policies & Tech",
                "Connections",
                "References"
            ],
            "tab_focus": "Focus",
            "footbar": true,
            "hero": {
                "src": "/assets/images/city.jpg",
                "alt": "An iamge of a bustling city."
            },
            "content": {
                "layers": []
            },
            "css": [],
            "js": []
        },
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
    },
    "routes": {
        "/": "index",
        "/test": "test",
        "/api/contact": "api-contact-list",
        "/api/contact/:contactId": "api-contact-details-by-id"
    }
};