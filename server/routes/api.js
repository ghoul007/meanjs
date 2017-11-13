var express = require("express");
var router = express.Router();
var axios = require("axios");
var url = "https://jsonplaceholder.typicode.com";

/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("api ...");
});

router.get("/posts", function(req, res, next) {
    return axios.get(`${url}/posts`)
        .then(function(data) {
            res.status(200).json(data.data);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
});

// router.get("/:param", function(req, res, next) {
//     var params = req.params;
//     var query = req.query;
//     Object.assign(params, query);
//     res.json(params);
// });

module.exports = router;