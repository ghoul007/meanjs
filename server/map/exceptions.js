var express = require('express');
var except = module.exports;

except.serverError = function (res, message) {
    return res
        .header("Content-Type", "application/json")
        .status(500)
        .json({
            name: "ServerError",
            message: message || 'Server Error !'
        });
};

except.resourceNotFoundError = function (res, message) {
    return res
        .header("Content-Type", "application/json")
        .status(404)
        .json({
            name: "ResourceNotFoundError",
            message: message || 'Resource not found !'
        });
};

except.badRequestError = function (res, message) {
    return res
        .header("Content-Type", "application/json")
        .status(400)
        .json({
            name: "BadRequestError",
            message: message || 'Missing Parameter(s) Error !'
        });
};

except.conflictError = function (res, message) {
    return res
        .header("Content-Type", "application/json")
        .status(409)
        .json({
            name: "ConflictError",
            message: message || 'Resource Conflict'
        });
};

except.forbiddenError = function (res, message) {
    return res
        .header("Content-Type", "application/json")
        .status(403)
        .json({
            name: "ForbiddenError",
            message: message || 'Forbidden Error!'
        });
};

except.unauthorizedError = function (res, message) {
    return res
        .header("Content-Type", "application/json")
        .status(401)
        .json({
            name: "unauthorizedError",
            message: message || 'unauthorized Error!'
        });
};
