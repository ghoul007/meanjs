var express = require("express");
var router = express.Router();



router.get('/admin', function(req, res, next) {
    var admin = process.env.SECRET_ADMIN;
    res.cookie('session', admin, { signed: true });
    req.session = admin;

    res.redirect('/');
})


router.all("*", function(req, res, next) {
    var hasCookie = req.signedCookies.session;
    console.log('ddd');
    if (hasCookie) {
        req.session = hasCookie;
    } else {
        var session = Math.floor(Math.random() * 100000000000000000);
        res.cookie("session", session, { signed: true });
        req.session = session;
    }
    console.log("Current Session: ", req.session);
    next();
});



module.exports = router;
