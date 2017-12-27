var path = require("path");
var fs = require("fs");





module.exports = {
    logger: (morgan, filename) => {
        if (!filename) filname = "admin.log";
        const adminLog = path.resolve(__dirname, "../", filename);
        const adminStream = fs.createWriteStream(adminLog, { flags: "a" });

        morgan.token("session", (req, res) => req.session);
        morgan.token("role", (req, res) => req.signedCookies.role);
        morgan.token("signedCookies", (req, res) => req.signedCookies.session);
        morgan.token("params", (req, res) => JSON.stringify(req.body));

        return morgan(":method :url :status (:params)  ", {
            stream: adminStream
        });
    },


    setRole: (role) => {
        return (req, res, next) => {
            req.session.role = role;
            req.session.save((err) => next());
        };
    },

    requireRole: (role) => {
        return function(req, res, next) {
            if (req.session.role && req.session.role == role) {
                next();
            } else {
                let error = new Error(`requires ${role}`);
                res.status(403).json({
                    status: 403,
                    message: error.message,
                    name: error.name
                });
            }
        };
    }
};