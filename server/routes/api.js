var express = require("express");
var morgan = require("morgan");
var router = express.Router();
var auth = require('../middleware/auth')
var rest = require('../middleware/rest');
var login = require('./api/login')
var users = require("./api/login");
// var axios = require("axios");
// var url = "https://jsonplaceholder.typicode.com";

/* GET users listing. */
var JSONAPIError = require('jsonapi-serializer').Error;


var authError = function(message) {
    return new JSONAPIError({
        status: 401,
        title: 'Invalid Authorization Parameters',
        detail: message
    });
};

var login = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    console.log("usernae", username, password);
    // debugger
    if (username && password) {
        var match = users.find(function(user) {
            return user.username === username && user.password === password;
        });
        if (match) {
            req.session.user = match;
            next();
        } else {
            res.status(401).json(authError('Invalid username or password for user authentication.'));
        }
    } else {
        res.status(401).json(authError('Must provide username or password for user authentication.'));
    }
};


router.post('/login', login, function(req, res, next) {
    req.session.save(function(err) {
        var user = req.session.user;
        var userJSON = user;
        userJSON.exp = new Date().getTime() + 600;
        // var jwt = res.jwt(userJSON);
        var jwt = res.jwt(user);

        res.json(jwt.token);
        // var user = req.session.user;
        // res.json(serializer.serialize(user));
    });
});




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