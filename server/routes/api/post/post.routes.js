var router = require('express').Router();
var postController = require('./post.controller');

module.exports = {
  test: function(api, uuid, data){postController.test(api, uuid, data)},
  test2: function(api, uuid, data){postController.test2(api, uuid, data)}

}
