var express = require("express");
var morgan = require("morgan");
var router = express.Router();
var auth = require('../middleware/auth')
var rest = require('../middleware/rest');
var login = require('./api/login')
var users = require("./api/login");
// var axios = require("axios");
// var url = "https://jsonplaceholder.typicode.com";



router.get("/", function(req, res, next) {
    res.send("api ..");
});

router.get("/posts", rest.list("posts"))
    // router.get("/posts", function(req, res, next) {
    //     return axios.get(`${url}/posts`)
    //         .then(function(data) {
    //             res.status(200).json(data.data);
    //         })
    //         .catch(function(err) {
    //             res.status(500).send(err);
    //         });
    // });
    // router.use('/admin', auth.logger(morgan, "admin.log"), auth.setRole('admin'));

router.get('/crash', function(req, res, next) {
        process.exit(1);
    })
    // router.get("/:param", function(req, res, next) {
    //     var params = req.params;
    //     var query = req.query;
    //     Object.assign(params, query);
    //     res.json(params);
    // });

module.exports = router;