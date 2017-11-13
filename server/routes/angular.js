var express = require('express');
var router = express.Router();
var path = require('path');

var angularPath = path.resolve(__dirname, '../../dist')


router.use(express.static(angularPath));

/* GET home page. */
router.get('*', function(req, res, next) {
    if (req.url.startsWith('/api')) return next();

    res.sendFile(path.join(angularPath, 'index.html'));
});

module.exports = router;