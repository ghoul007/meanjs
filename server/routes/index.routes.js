var express = require("express");
var router = express.Router();
var indexController = require("../controllers/index.controller");
var apiRoutes = require("./api/api.routes");
var loginRoutes = require("./api/login.routes");

router.use(loginRoutes);
router.use(apiRoutes);
router.use("/", indexController);

// router.get("/crash", function(req, res, next) {
//     process.exit(1);
// });

module.exports = router;