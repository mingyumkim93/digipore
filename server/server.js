var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static("../wwwroot"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session');
app.use(session({
  secret: 'alskdjskal',
  resave: false,
  saveUninitialized: true
}));

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

let db = require("./mysqlhelper");
let errandApi = require("./errandapi");
let userApi = require('./userapi');
let reviewApi = require('./reviewapi');
let offerApi = require("./offerapi")

errandApi(app, db);
userApi(app, db, passport, LocalStrategy);
reviewApi(app, db);
offerApi(app, db)

app.listen(9000);


path = require("path");
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../wwwroot/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

