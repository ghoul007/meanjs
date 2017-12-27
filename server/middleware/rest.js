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
    load: (req, id, callback) => {
        let user = users.filter((user) => {
            return user.id === id;
        })[0];
        if (!user) {
            callback("Not found");
        } else {
            callback(null, user);
        }
    },

    /** GET / - List all entities */
    list: (resource) => {
        return (req, res, next) => {
            return axios
                .get(`${url}/${resource}`)
                .then((data) => {
                    res.status(200).json(data.data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        };
    },

    /** POST / - Create a new entity */
    create: (req, res) => {
        let user = req.body;
        user.id = users.length.toString(36);
        users.push(user);
        res.json(user);
    },

    /** GET /:id - Return a given entity */
    read: (req, res) => res.json(req.user),

    /** PUT /:id - Update a given entity */
    update: (req, res) => {
        let id = req.params[this.id];

        for (let i = users.length; i--;) {
            if (users[i].id === id) {
                users[i] = req.body;
                users[i].id = id;
                return res.status(204).send("Accepted");
            }
        }
        res.status(404).send("Not found");
    },

    /** DELETE /:id - Delete a given entity */
    delete: (req, res) => {
        let id = req.params[this.id];

        for (let i = users.length; i--;) {
            if (users[i].id === id) {
                users.splice(i, 1);
                return res.status(200);
            }
        }

        res.status(404).send("Not found");
    }
};