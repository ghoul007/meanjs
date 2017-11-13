var axios = require("axios");
var url = "https://jsonplaceholder.typicode.com";
var resource = require("resource-router-middleware");

var users = [];

module.exports = {
    mergeParams: true,

    /** Property name to store preloaded entity on `request`. */
    id: "user",

    /** For requests with an `id`, you can auto-load the entity.
     *	Errors terminate the request, success sets `req[id] = data`.
     */
    load: function(req, id, callback) {
        var user = users.filter(function(user) {
            return user.id === id;
        })[0];
        if (!user) {
            callback("Not found");
        } else {
            callback(null, user);
        }
    },

    /** GET / - List all entities */
    list: function(resource) {
        return function(req, res, next) {
            return axios
                .get(`${url}/${resource}`)
                .then(function(data) {
                    res.status(200).json(data.data);
                })
                .catch(function(err) {
                    res.status(500).send(err);
                });
        };
    },

    /** POST / - Create a new entity */
    create: function(req, res) {
        var user = req.body;
        user.id = users.length.toString(36);
        users.push(user);
        res.json(user);
    },

    /** GET /:id - Return a given entity */
    read: function(req, res) {
        res.json(req.user);
    },

    /** PUT /:id - Update a given entity */
    update: function(req, res) {
        var id = req.params[this.id];

        for (var i = users.length; i--;) {
            if (users[i].id === id) {
                users[i] = req.body;
                users[i].id = id;
                return res.status(204).send("Accepted");
            }
        }
        res.status(404).send("Not found");
    },

    /** DELETE /:id - Delete a given entity */
    delete: function(req, res) {
        var id = req.params[this.id];

        for (var i = users.length; i--;) {
            if (users[i].id === id) {
                users.splice(i, 1);
                return res.status(200);
            }
        }

        res.status(404).send("Not found");
    }
};