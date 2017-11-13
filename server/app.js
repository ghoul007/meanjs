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
var helmet = require('helmet');

var app = express();
var sess = require('express-session');
require("dotenv").config();

app.use(helmet());

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

app.use(sess({
    secret: process.env.my_cookie_secret,
    resave: false,
    saveUninitialized: false,
    name: 'project-session',
    cookie: {
        secure: false,
        httpOnly: false,
        domain: 'localhost',
        expires: new Date(Date.now() + 60 * 60 * 1000)
    },
    // store: MyExpressSessionStore
}));

app.use('/admin', auth.logger(morgan, "admin.log"), auth.setRole('admin'));
app.use("/login", login);
app.use("/api", auth.requireRole("admin"), auth.logger(morgan, "api.log"), api);
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