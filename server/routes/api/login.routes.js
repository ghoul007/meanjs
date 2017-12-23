var express = require("express");
var router = express.Router();
var auth = require("../../middleware/auth");
var morgan = require("morgan");
var winston = require("winston");
var mung = require("express-mung");
var loginController = require("../../controllers/login.controller");

router.use("/cm", auth.logger(morgan, "./log/login.log"), loginController);

module.exports = router;