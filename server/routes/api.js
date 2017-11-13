var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

router.get("/:param", function(req, res, next) {
    var params = req.params;
    var query = req.query;
    Object.assign(params, query);
    res.json(params);
});

module.exports = router;