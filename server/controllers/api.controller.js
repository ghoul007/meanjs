var express = require("express");
var router = express.Router();
var rest = require("./generic/rest");
var API = require("../middleware/rest");

router.use(rest);
router.get("/posts", API.list("posts"))

module.exports = router;