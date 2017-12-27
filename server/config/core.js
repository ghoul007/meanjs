require("dotenv").config();
var request = require('request');
var values = require('object.values');
var settings = require('../helpers/settings');
var except = require('../helpers/APIError');
var api = module.exports;
var apiUrl = process.env.API
var apiMapUrl = settings.api.map;
var headers = {
    'content-type': 'application/json'
};
api.findResource = (res, resource) => {

    var getUrl = (resource, action) => apiUrl + apiMapUrl[resource][action].url;


    var getUrlParams = (resource, action, uuid) => {
        const re = /<+\w+>/g;
        let url = getUrl(resource, action);
        return url.replace(re, uuid);
    };

    var getUrlParamsQuery = (resource, action, data) => {
        const re = /<+\w+>/g;
        let url = getUrl(resource, action);
        let searchParams = JSON.stringify(data).replace(/:/g, '=').replace(/,/g, '&').replace(/[{"}]/g, "")
        return url.replace(re, searchParams);
    };

    var getMethod = (resource, action) => apiMapUrl[resource][action].method;

    var call = (action, res, data, uuid) => {

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

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
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


api.middleware = (res, resource, action) => {
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
api.setHeaders = (key, value) => {
    headers[key] = value;
};

api.getHeaders = () => {
    return headers;
};

api.setToken = (token) => {
    headers['token'] = token;
};

module.exports = api;