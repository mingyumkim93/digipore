var express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(express.static("../wwwroot"));
app.use(bodyParser.json());


let db = require("./mysqlhelper");
let requestApi = require("./requestapi");
requestApi(app,db);
app.listen(9000);


path = require("path");
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../wwwroot/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
  