var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var angular = require("./controllers/index.controller");
var api = require("./controllers/api.controller");
var login = require("./controllers/login.controller");
var routes = require("./routes/index.routes");

var auth = require("./middleware/auth");

var morgan = require("morgan");
var jwt = require('jwt-express')
var app = express();
var sess = require('express-session');
require("dotenv").config();
var env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("short"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));

app.use(cookieParser(process.env.my_cookie_secret));
app.use(express.static(path.join(__dirname, "public")));
app.use(jwt.init("process.env.jwtSecret", {
        cookieOptions: { httpOnly: false }
    }))
    // app.use(session);
if (env == 'production') {
    app.use(sess({
        secret: process.env.my_cookie_secret,
        resave: false,
        saveUninitialized: true,
        name: 'project-session',
        cookie: {
            secure: true,
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(Date.now() + 60 * 60 * 1000)
        },
        // store: MyExpressSessionStore
    }));

    var helmet = require('helmet');
    app.use(helmet());
} else {

    app.use(sess({
        secret: process.env.my_cookie_secret,
        resave: false,
        saveUninitialized: true,

    }));
}

// app.use(sess({
//     secret: process.env.my_cookie_secret,
//     resave: true,
//     saveUninitialized: true,
//     name: 'express-project-session',
//     cookie: {
//         secure: true,
//         httpOnly: true,
//         domain: 'localhost',
//         expires: new Date(Date.now() + 60 * 60 * 1000)
//     }
// }));

// var helmet = require('helmet');
// app.use(helmet());


// app.use("/admin", function(req, res, next) {
//     req.session["role"] = "admin";
//     req.session.save(function(err) {
//         res.redirect('/');
//     });


// });

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});



// error handler
app.use(function(err, req, res, next) {

    if (err.name == 'JWTExpressError') {
        // user is unauthorized
        res.status(401).send(err);
        // res.render('401', { error: err });
    } else {
        next(err);
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
