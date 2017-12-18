var express = require("express");
var router = express.Router();
var auth = require("../../middleware/auth");
var morgan = require("morgan");
var winston = require("winston");
var mung = require("express-mung");
var api = require("../../controllers/api.controller");

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./log/log.log" })
  ]
});

logger.log("info", "Hello distributed log files!");
router.use(
  mung.json(function transform(body, req, res) {
    logger.log("info", {
      Method: req.method,
      Url: req.originalUrl,
      Status: res.statusCode,
      Header: JSON.stringify(req.headers),
      Request: JSON.stringify(req.body),
      responseBody: JSON.stringify(body)
    });
  })
);

router.use("/api", auth.logger(morgan, "./log/api.log"), api);
// router.use("/api",  api);

module.exports = router;
