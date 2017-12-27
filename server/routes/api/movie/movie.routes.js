var router = require('express').Router();
var movieController = require('./movie.controller');

module.exports = {
    test: (api, uuid, data) => { movieController.test(api, uuid, data) },
    test2: (api, uuid, data) => { movieController.test2(api, uuid, data) },
    list: (api, uuid, data) => { movieController.list(api, uuid, data) },
    create: (api, uuid, data) => { movieController.create(api, uuid, data) },
    update: (api, uuid, data) => { movieController.update(api, uuid, data) },
    filter: (api, uuid, data) => { movieController.filter(api, uuid, data) },
    delete: (api, uuid, data) => { movieController.delete(api, uuid, data) }

}