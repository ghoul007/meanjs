var express = require("express");
var router = express.Router();
var rest = require("../../helpers/rest");
var API = require("../../middleware/rest");

router.use(rest);
// router.use("/post", require('./post/post.routes'));
// router.use("/movie", require('./movie/movie.routes'));

module.exports = router;