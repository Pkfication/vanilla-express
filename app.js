var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("./helpers/errors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(require('express-status-monitor')());
require("./routes")(app);

app.use(function (err, req, res, next) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
})

module.exports = app;
