var path = require("path");
var fs = require("fs");

module.exports = {
    logger: function(morgan, filename) {
        if (!filename) filname = "admin.log";
        var adminLog = path.resolve(__dirname, "../", filename);
        var adminStream = fs.createWriteStream(adminLog, { flags: "a" });

        morgan.token("session", function(req, res) {
            return req.session;
        });
        morgan.token("role", function(req, res) {
            return req.signedCookies.role;
        });
        morgan.token("signedCookies", function(req, res) {
            return req.signedCookies.session;
        });

        return morgan(":method :url :status (:role :session :signedCookies)", {
            stream: adminStream
        });
    },


    setRole: function(role) {
        return function(req, res, next) {
            req.session.role = role;
            req.session.save(function(err) {
                next();
            });
        };
    },

    requireRole: function(role) {
        return function(req, res, next) {
            if (req.session.role && req.session.role == role) {
                next();
            } else {
                var error = new Error(`requires ${role}`);
                res.status(403).json({
                    status: 403,
                    message: error.message,
                    name: error.name
                });
            }
        };
    }
};