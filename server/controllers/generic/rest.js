var express = require("express");
var router = express.Router();
var auth = require("../../middleware/auth");
var api = require("../../config/api");

/**
 * Get list of resource
 */
router.post("/list_resource", function(req, res, next) {
    var resource = req.body.resource;
    var uuid = req.body.uuid;
    var action = "list";
    const AuthStr = "Bearer ".concat(req.session.tokenApi);
    let token = (req.session.tokenApi && AuthStr) || req.client.parser.incoming.headers.authorization;
    console.log("AuthStr", token);
    api.setHeaders("Authorization", token);
    console.log(resource);
    if (uuid) {
        action = "get_by_id";
        api
            .findResource(res, resource)
            .call(action, null, uuid)
            .then(function(data) {
                res.status(200).send(values(data));
            });
    } else {
        api
            .findResource(res, resource)
            .call(action)
            .then(function(data) {
                console.log("data", data);
                res.status(200).send(data);
            });
    }
});

/**
 * Creates a new resource
 */
router.post("/xxx_resources", function(req, res, next) {
    var resource = req.body.resource;
    var data = req.body.data;
    var action = "create";
    console.log(req.body);
    const AuthStr = "Bearer ".concat(req.session.tokenApi);
    let token = (req.session.tokenApi && AuthStr) || req.client.parser.incoming.headers.authorization;
    console.log("AuthStr", token);
    api.setHeaders("Authorization", token);

    api
        .findResource(res, resource)
        .call(action, data)
        .then(function(data) {
            res.status(200).send(values(data));
        });
});

/**
 * Update resource
 */
router.post("/update_resource", function(req, res, next) {
    var resource = req.body.resource;
    var uuid = req.body.uuid;
    var data = req.body.data;
    var action = "update";
    var obj = {};
    obj[uuid] = data;

    const AuthStr = "Bearer ".concat(req.session.tokenApi);
    let token = (req.session.tokenApi && AuthStr) || req.client.parser.incoming.headers.authorization;
    console.log("AuthStr", token);
    api.setHeaders("Authorization", token);
    api
        .findResource(res, resource)
        .call(action, data, uuid)
        .then(function(data) {
            res.status(200).send(values(data));
        });
});

/**
 * Delete resource
 */
router.post("/delete_resource", function(req, res, next) {
    var resource = req.body.resource;
    var uuid = req.body.uuid;
    var action = "delete";
    const AuthStr = "Bearer ".concat(req.session.tokenApi);
    let token = (req.session.tokenApi && AuthStr) || req.client.parser.incoming.headers.authorization;
    console.log("AuthStr", token);
    api.setHeaders("Authorization", token);

    api
        .findResource(res, resource)
        .call(action, null, uuid)
        .then(function(data) {
            res.status(200).send(values(data));
        });
});

module.exports = router;