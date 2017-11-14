var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var angular = require("./routes/angular");
var api = require("./routes/api");
// var session = require("./routes/session");
var login = require("./routes/login");

var auth = require("./middleware/auth");

var morgan = require("morgan");

var app = express();
var sess = require('express-session');
require("dotenv").config();
var env = process.env.NODE_ENV || 'development';


app.use(morgan("short"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.my_cookie_secret));
app.use(express.static(path.join(__dirname, "public")));

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


app.use("/admin", function(req, res, next) {
    req.session["role"] = "admin";
    req.session.save(function(err) {
        res.redirect('/');
    });


});

app.use("/login", login);
app.use("/api", auth.logger(morgan, "api.log"), auth.requireRole('admin'), api);
app.use("/", angular);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;