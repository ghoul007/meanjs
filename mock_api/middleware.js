const jwt = require("jsonwebtoken");
const APP_SECRET = "process.env.jwtSecret";
const USERNAME = "angus.dickens@example.org";
const PASSWORD = "secret";

module.exports = function(req, res, next) {

    if (req.url == "/login" && req.method == "POST") {
        if (req.body != null && req.body.username == USERNAME &&
            req.body.password == PASSWORD) {
            let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false });
        }
        res.end();
        return;
    } else if (req.url.startsWith("/movies") && req.method != "GET") {
        let token = req.headers["authorization"];
        console.log(token);
        if (token != null && token.startsWith("Bearer")) {
            console.log("-------------");
            token = token.substring(7, token.length - 1);
            try {
                console.log("2", token);
                // jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) {
                console.log("error", err);
            }
        }

        var error = new Error(`requires`);
        res.status(403).json({
            status: 403,
            message: error.message,
            name: error.name
        });

        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}
