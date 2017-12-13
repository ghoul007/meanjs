var express = require("express");
var router = express.Router();
var users = require("./api/login");
var rest = require("../middleware/rest");
var axios = require('axios');


var JSONAPIError = require('jsonapi-serializer').Error;


var authError = function(message) {
    return new JSONAPIError({
        status: 401,
        title: 'Invalid Authorization Parameters',
        detail: message
    });
};

var url = "http://127.0.0.1:8000";
var authenticate = function(username, password, req, res, next) {
    return axios.post(`${url}/authenticate`, {
            'username': username,
            'password': password
        })
        .then(function(data) {
            req.session.user = JSON.parse(data.config.data);
            req.session.tokenApi = data.data.token
            next();

        }, function(err) {
            res.status(401).json(authError('Invalid username or password for user authentication.'));
        })
}

var login = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log("usernae", username, password);
    // debugger
    if (username && password) {
        var match = authenticate(username, password, req, res, next);
        // if (match) {
        //     req.session.user = match;
        //     next();
        // } else {
        //     res.status(401).json(authError('Invalid username or password for user authentication.'));
        // }
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






// var axios = require("axios");
// var url = "https://jsonplaceholder.typicode.com";

/* GET users listing. */
// router.post("/", function(req, res, next) {
//     var username = req.body.username || "Nicholas";
//     var password = req.body.password || "Secret";
//     console.log("username", username);
//     if (username && password) {
//         var match = users.find(function(user) {
//             return user.username == username && user.password == password;
//         });

//         if (match) {
//             req.session.user = match;
//             next();
//         } else {
//             res.status(401).json(authError('Invalid username or password for user authentication.'));
//         }


//     }
// });

module.exports = router;
