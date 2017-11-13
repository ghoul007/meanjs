var express = require("express");
var router = express.Router();
var users = require("./api/login");
var rest = require("../middleware/rest");

var JSONParseError = require("jsonapi-serializer").Error;


var authError = function(message) {
    return new JSONAPIError({
        status: 401,
        title: 'Invalid Authorization Parameters',
        detail: message
    });
};
// var axios = require("axios");
// var url = "https://jsonplaceholder.typicode.com";

/* GET users listing. */
router.post("/", function(req, res, next) {
    var username = req.body.username || "Nicholas";
    var password = req.body.password || "Secret";

    if (username && password) {
        var match = users.find(function(user) {
            return user.username == username && user.password == password;
        });

        if (match) {
            req.session.user = match;
            next();
        } else {
            res.status(401).json(authError('Invalid username or password for user authentication.'));
        }


    }
});

module.exports = router;