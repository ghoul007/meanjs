var router = require('express').Router();
var movieController = require('./movie.controller');

module.exports = {
  test: function(api, uuid, data){movieController.test(api, uuid, data)},
  test2: function(api, uuid, data){movieController.test2(api, uuid, data)},
  list: function(api, uuid, data){movieController.list(api, uuid, data)},
  create: function(api, uuid, data){movieController.create(api, uuid, data)},
  update: function(api, uuid, data){movieController.update(api, uuid, data)},
  filter: function(api, uuid, data){movieController.filter(api, uuid, data)},
  delete: function(api, uuid, data){movieController.delete(api, uuid, data)}

}
