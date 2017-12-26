var router = require('express').Router();
var postController = require('./post.controller');

module.exports = {
  test: function(api, uuid, data){postController.test(api, uuid, data)},
  test2: function(api, uuid, data){postController.test2(api, uuid, data)},
  list: function(api, uuid, data){postController.list(api, uuid, data)},
  create: function(api, uuid, data){postController.create(api, uuid, data)},
  update: function(api, uuid, data){postController.update(api, uuid, data)},
  filter: function(api, uuid, data){postController.filter(api, uuid, data)},
  delete: function(api, uuid, data){postController.delete(api, uuid, data)}
}
