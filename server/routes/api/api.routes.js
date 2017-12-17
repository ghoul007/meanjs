

var express = require("express");
var router = express.Router();
var auth = require("../../middleware/auth");
var morgan = require("morgan");
var api = require("../../controllers/api.controller");


router.use("/api", auth.logger(morgan, "./log/api.log"), api);
// router.use("/api",  api);

module.exports= router;
