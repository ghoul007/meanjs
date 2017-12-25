var express = require('express');

module.exports = {
    resourceNotFoundError: function(res, message) {
        return res
            .header("Content-Type", "application/json")
            .status(404)
            .json({
                name: "ResourceNotFoundError",
                message: message || 'Resource not found !'
            });
    },
    badRequestError: function(res, message) {
        return res
            .header("Content-Type", "application/json")
            .status(400)
            .json({
                name: "BadRequestError",
                message: message || 'Missing Parameter(s) Error !'
            });
    },
    conflictError: function(res, message) {
        return res
            .header("Content-Type", "application/json")
            .status(409)
            .json({
                name: "ConflictError",
                message: message || 'Resource Conflict'
            });
    },
    forbiddenError: function(res, message) {
        return res
            .header("Content-Type", "application/json")
            .status(403)
            .json({
                name: "ForbiddenError",
                message: message || 'Forbidden Error!'
            });
    },
    unauthorizedError: function(res, message) {
        return res
            .header("Content-Type", "application/json")
            .status(401)
            .json({
                name: "unauthorizedError",
                message: message || 'unauthorized Error!'
            });
    },
    serverError: function(res, message) {
        return res
            .header("Content-Type", "application/json")
            .status(500)
            .json({
                name: "ServerError",
                message: message || 'Server Error !'
            });
    },
    handleError: function(response) {
        if (response.statusCode == 401) {
            deferred.resolve(null);
        } else if (response.statusCode == 404) {
            deferred.reject(resourceNotFoundError(response));
        } else if (response.statusCode == 400) {
            if (response.body)
                deferred.reject(badRequestError(response, response.body.message));
        } else if (response.statusCode == 409) {
            deferred.reject(conflictError(response, response.body.message));
        } else if (response.statusCode == 403) {
            deferred.reject(forbiddenError(response));
        } else if (response.statusCode == 500) {
            deferred.reject(serverError(response, response.body.message));
        }
    }
}