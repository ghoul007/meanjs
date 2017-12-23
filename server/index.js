var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var routes = require("./routes/index.routes");
var morgan = require("morgan");
var jwt = require("jwt-express");
var sess = require("express-session");
require("dotenv").config();
var env = process.env.NODE_ENV || "development";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
// app.use(logger("dev"));

app.use(cookieParser(process.env.MY_COOKIE_SECRET));
app.use(
    jwt.init(process.env.JWT_SECRET, {
        cookieOptions: { httpOnly: false }
    })
);
if (env == "production") {
    app.use(
        sess({
            secret: process.env.MY_COOKIE_SECRET,
            resave: false,
            saveUninitialized: true,
            name: "project-session",
            cookie: {
                secure: true,
                httpOnly: true,
                domain: "localhost",
                expires: new Date(Date.now() + 60 * 60 * 1000)
            }
        })
    );

    var helmet = require("helmet");
    app.use(helmet());
} else {
    app.use(
        sess({
            secret: process.env.MY_COOKIE_SECRET,
            resave: false,
            saveUninitialized: true
        })
    );
}

app.use(routes);

app.use(function(req, res, next) {
    console.log(res);
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    if (err.name == "JWTExpressError") {
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