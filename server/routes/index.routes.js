var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
var morgan = require("morgan");
var apiController = require("../controllers/api.controller");
var loginController = require("../controllers/login.controller");
var indexController = require("../controllers/index.controller");
var apiRoutes = require("./api/api.routes");



router.use("/cm",auth.logger(morgan, "./log/login.log"),  loginController);
// auth.logger(morgan, "../log/login.log"),
router.use(apiRoutes);
//jwt.active(),
// app.use("/api", auth.logger(morgan, "api.log"), auth.requireRole('admin'), api);

// angular
router.use("/", indexController);

module.exports = router;
