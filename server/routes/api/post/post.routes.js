var router = require('express').Router();
var postController = require('./post.controller');

module.exports = {

    test: (api, uuid, data) => { postController.test(api, uuid, data) },
    test2: (api, uuid, data) => { postController.test2(api, uuid, data) },
    list: (api, uuid, data) => { postController.list(api, uuid, data) },
    create: (api, uuid, data) => { postController.create(api, uuid, data) },
    update: (api, uuid, data) => { postController.update(api, uuid, data) },
    filter: (api, uuid, data) => { postController.filter(api, uuid, data) },
    delete: (api, uuid, data) => { postController.delete(api, uuid, data) }
}