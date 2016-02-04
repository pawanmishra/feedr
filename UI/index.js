var express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var feeds = require('./routes/feeds');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(feeds);

app.use(function(req, res, next){
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;