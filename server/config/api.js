require("dotenv").config();
var request = require('request');
var values = require('object.values');
var q = require('q');
var settings = require('../helpers/settings');
var except = require('../helpers/APIError');
var api = module.exports;
var fs = require('fs');
var apiUrl = process.env.API
var apiMapUrl = settings.api.map;
var headers = {
    'content-type': 'application/json'
};
api.findResource = function(res, resource) {

    var getUrl = function(resource, action) {
        return apiUrl + apiMapUrl[resource][action].url;
    };

    var getUrlParams = function(resource, action, uuid) {
        var re = /<+\w+>/g;
        var url = getUrl(resource, action);
        return url.replace(re, uuid);
    };

    var getUrlParamsQuery = function(resource, action, data) {
        var re = /<+\w+>/g;
        var url = getUrl(resource, action);
        const searchParams = JSON.stringify(data).replace(/:/g, '=').replace(/,/g, '&').replace(/[{"}]/g, "")
        return url.replace(re, searchParams);
    };

    var getMethod = function(resource, action) {
        return apiMapUrl[resource][action].method;
    };

    var call = function(action, data, uuid) {

        var method, url, headers, deferred = q.defer();

        if (!apiMapUrl.hasOwnProperty(resource))
            return except.serverError(res, 'Resource `' + resource || "" + '` not found');

        if (!action)
            return except.serverError(res, 'No action defined to call !');

        var listOfActions = Object.keys(apiMapUrl[resource]);

        if (listOfActions.indexOf(action) < 0)
            return except.serverError(res, 'Undefined action !');

        method = getMethod(resource, action);
        url = getUrl(resource, action);
        headers = api.getHeaders();
        var options = {
            method: method,
            url: url,
            headers: headers
        };

        if (uuid)
            options.url = getUrlParams(resource, action, uuid);

        if (action == "filter")
            options.url = getUrlParamsQuery(resource, action, data);

        if (data) {
            options.json = true;
            options.body = data;
        }

        request(options, function(error, response, body) {
            var resp = null;
            try {
                resp = JSON.parse(body);
            } catch (error) {
                resp = body;
            }

            if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
                deferred.resolve(resp);
            } else if (response.statusCode == 401) {
                deferred.resolve(null);
            } else if (response.statusCode == 404) {
                except.resourceNotFoundError(res);
            } else if (response.statusCode == 400) {
                if (resp.body)
                    except.badRequestError(res, resp.body.message);
            } else if (response.statusCode == 409) {
                except.conflictError(res, resp.body.message);
            } else if (response.statusCode == 403) {
                except.forbiddenError(res);
            } else if (response.statusCode == 500) {
                except.serverError(res, resp.body.message);
            }

        });

        return deferred.promise;

    };

    return {
        'call': call
    };

};

api.setHeaders = function(key, value) {
    headers[key] = value;
};

api.getHeaders = function() {
    return headers;
};

api.setToken = function(token) {
    headers['token'] = token;
};

module.exports = api;
