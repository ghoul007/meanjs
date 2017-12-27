var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
var api = require("../config/core");
var exception = require("./APIError");


/**
 * Get list of resource
 */

router.post("/list_resource", (req, res, next) => {
    const resource = req.body.resource;
    const uuid = req.body.uuid;
    let action = "list";
    setTokenHeader(req, api);
    // api.middleware(res, resource, action);
    if (uuid) {
        action = "get_by_id";
        api
            .findResource(res, resource)
            .call(action, res, null, uuid)
            .then(
                (data) => {
                    res.status(200).send(data);
                },
                (err) => {
                    return err;
                }
            );
    } else {
        api
            .findResource(res, resource)
            .call(action, res)
            .then(
                (data) => {
                    res.status(200).send(data);
                },
                (err) => {
                    return err;
                }
            );
    }
});

/**
 * Creates a new resource
 */
router.post("/create_resource", (req, res, next) => {
    const resource = req.body.resource;
    const action = "create";
    var data = req.body.data;
    setTokenHeader(req, api);
    api.middleware(res, resource, action);
    api
        .findResource(res, resource)
        .call(action, res, data)
        .then(
            (data) => {
                res.status(200).send(data);
            },
            (err) => {
                return err;
            }
        );
});

/**
 * Update resource
 */
router.post("/update_resource", (req, res, next) => {
    const resource = req.body.resource;
    const uuid = req.body.uuid;
    const action = "update";
    var data = req.body.data;
    var obj = {};
    obj[uuid] = data;
    setTokenHeader(req, api);
    api.middleware(res, resource, action);
    api
        .findResource(res, resource)
        .call(action, res, data, uuid)
        .then(
            (data) => {
                res.status(200).send(data);
            },
            (err) => {
                return err;
            }
        );
});

/**
 * Delete resource
 */
router.post("/delete_resource", (req, res, next) => {
    const resource = req.body.resource;
    const action = "delete";
    const uuid = req.body.uuid;
    setTokenHeader(req, api);
    api.middleware(res, resource, action);
    api
        .findResource(res, resource)
        .call(action, res, null, uuid)
        .then(
            (data) => {
                res.status(200).send(data);
            },
            (err) => err

        );
});

/**
 * Filter resource [_page, _limit, _sort, _order, _start, _end, _gte, _lte, _like, q ]
 */
router.post("/filter_resource", (req, res, next) => {
    const resource = req.body.resource;
    const action = "filter";
    var data = req.body.data;
    setTokenHeader(req, api);
    api.middleware(res, resource, action);
    api
        .findResource(res, resource)
        .call(action, res, data, null)
        .then(
            (data) => {
                res.status(200).send(data);
            },
            (err) => err

        );
});

/**
 * Action resource
 */
router.post("/action_resource", (req, res, next) => {
    const resource = req.body.resource;
    const action = req.body.action;
    var data = req.body.data;

    setTokenHeader(req, api);
    api.middleware(res, resource, action);
    api
        .findResource(res, resource)
        .call(action, res, data, null)
        .then(
            (data) => {
                res.status(200).send(data);
            },
            (err) => err

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