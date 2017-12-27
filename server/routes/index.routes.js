var express = require("express");
var router = express.Router();
var indexController = require("./default/default.controller");
var morgan = require("morgan");
var auth = require("../middleware/auth");
var apiController = require("./api/api");
var loginController = require("./auth/login.controller");

// router.use("/cm", auth.logger(morgan, "./log/login.log"), loginController);
// router.use("/api", auth.logger(morgan, "./log/api.log"), apiController);
router.use("/cm", loginController);
router.use("/api", apiController);
router.use("/", indexController);

// router.get("/crash", function(req, res, next) {
//     process.exit(1);
// });

module.exports = router;