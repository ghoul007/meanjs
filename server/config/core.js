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

    var call = function(action, res, data, uuid) {

        var method, url, headers, response;

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

        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
                    var result = (typeof body == "string") ? JSON.parse(body) : body;
                    resolve(result);
                } else {
                    reject(except.handleError(response, res));
                }
            });
        });
    };

    return {
        'call': call
    };

};


api.middleware = function(res, resource, action) {
    try {
        require(`../routes/api/${resource}/${resource}.routes`)[action](
            api,
            (uuid = null),
            (data = null)
        );
    } catch (e) {
        except.customError(res, 500, 'ServerError', 'Oops ')
    }
}
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