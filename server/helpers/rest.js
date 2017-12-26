var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
var api = require("../config/core");
var exception = require("./APIError");







/**
 * Get list of resource
 */

router.post("/list_resource", function(req, res, next) {
    var resource = req.body.resource;
    var uuid = req.body.uuid;
    var action = "list";
    setTokenHeader(req, api);
    if (uuid) {
        action = "get_by_id";
        api
            .findResource(res, resource)
            .call(action, res, null, uuid)
            .then(
                function(data) {
                    res.status(200).send(data);
                },
                function(err) {
                    return err;
                }
            );
    } else {
        api
            .findResource(res, resource)
            .call(action, res)
            .then(
                function(data) {
                    res.status(200).send(data);
                },
                function(err) {
                    return err;
                }
            );
    }
});

/**
 * Creates a new resource
 */
router.post("/create_resource", function(req, res, next) {
    var resource = req.body.resource;
    var data = req.body.data;
    var action = "create";
    setTokenHeader(req, api);
    api
        .findResource(res, resource)
        .call(action, res, data)
        .then(
            function(data) {
                res.status(200).send(data);
            },
            function(err) {
                return err;
            }
        );
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
    setTokenHeader(req, api);
    api
        .findResource(res, resource)
        .call(action, res, data, uuid)
        .then(
            function(data) {
                res.status(200).send(data);
            },
            function(err) {
                return err;
            }
        );
});

/**
 * Delete resource
 */
router.post("/delete_resource", function(req, res, next) {
    var resource = req.body.resource;
    var uuid = req.body.uuid;
    var action = "delete";
    setTokenHeader(req, api);
    api
        .findResource(res, resource)
        .call(action, res, null, uuid)
        .then(
            function(data) {
                res.status(200).send(data);
            },
            function(err) {
                return err;
            }
        );
});

/**
 * Filter resource [_page, _limit, _sort, _order, _start, _end, _gte, _lte, _like, q ]
 */
router.post("/filter_resource", function(req, res, next) {
    var resource = req.body.resource;
    var data = req.body.data;
    var action = "filter";
    setTokenHeader(req, api);
    api
        .findResource(res, resource)
        .call(action, res, data, null)
        .then(
            function(data) {
                res.status(200).send(data);
            },
            function(err) {
                return err;
            }
        );
});

/**
 * Action resource
 */
router.post("/action_resource", function(req, res, next) {
    var resource = req.body.resource;
    var data = req.body.data;
    var action = req.body.action;

    setTokenHeader(req, api);
    api.middleware(res, resource, action);
    api
        .findResource(res, resource)
        .call(action, res, data, null)
        .then(
            function(data) {
                res.status(200).send(data);
            },
            function(err) {
                return err;
            }
        );
});

/**
 * Add JWT Token in the header request
 */
function setTokenHeader(req, api) {
    let AuthStr = "Bearer ".concat(req.session.tokenApi);
    let token =
        (req.session.tokenApi && AuthStr) ||
        req.client.parser.incoming.headers.authorization;
    api.setHeaders("Authorization", token);
}

module.exports = router;