var router = require('express').Router();
var movieController = require('./movie.controller');

module.exports = {
  test: function(api, uuid, data){movieController.test(api, uuid, data)},
  test2: function(api, uuid, data){movieController.test2(api, uuid, data)}

}
