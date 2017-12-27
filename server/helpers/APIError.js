var express = require('express');

module.exports = {
    resourceNotFoundError: (res, message) => {
        return res
            .header("Content-Type", "application/json")
            .status(404)
            .json({
                name: "ResourceNotFoundError",
                message: message || 'Resource not found !'
            });
    },
    badRequestError: (res, message) => {
        return res
            .header("Content-Type", "application/json")
            .status(400)
            .json({
                name: "BadRequestError",
                message: message || 'Missing Parameter(s) Error !'
            });
    },
    conflictError: (res, message) => {
        return res
            .header("Content-Type", "application/json")
            .status(409)
            .json({
                name: "ConflictError",
                message: message || 'Resource Conflict'
            });
    },
    forbiddenError: (res, message) => {
        return res
            .header("Content-Type", "application/json")
            .status(403)
            .json({
                name: "ForbiddenError",
                message: message || 'Forbidden Error!'
            });
    },
    unauthorizedError: (res, message) => {
        return res
            .header("Content-Type", "application/json")
            .status(401)
            .json({
                name: "unauthorizedError",
                message: message || 'unauthorized Error!'
            });
    },
    serverError: (res, message) => {
        return res
            .header("Content-Type", "application/json")
            .status(500)
            .json({
                name: "ServerError",
                message: message || 'Server Error !'
            });
    },
    customError: (res, status, header, message) => {
        return res
            .header("Content-Type", "application/json")
            .status(status)
            .json({
                name: header,
                message: message || 'Server Error !'
            });
    },
    handleError: (response, res) => {
        if (response.statusCode == 401) {
            return null;
        } else if (response.statusCode == 404) {
            return this.resourceNotFoundError(res);
        } else if (response.statusCode == 400) {
            if (response.body)
                return this.badRequestError(res, response.body.message);
        } else if (response.statusCode == 409) {
            return this.conflictError(res, response.body.message);
        } else if (response.statusCode == 403) {
            deferred.reject(forbiddenError(res));
        } else if (response.statusCode == 500) {
            return this.serverError(res, response.body.message);
        }
    }
}