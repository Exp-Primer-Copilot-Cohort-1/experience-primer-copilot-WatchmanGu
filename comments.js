// Create web server
// 1. npm init -y
// 2. npm install express --save
// 3. npm install body-parser --save
// 4. node comments.js
// 5. http://localhost:3000/comments

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.get("/comments", function (req, res) {
  fs.readFile(__dirname + "/" + "comments.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.post("/comments", urlencodedParser, function (req, res) {
  // First read existing comments.
  fs.readFile(__dirname + "/" + "comments.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["comment" + req.body.id] = req.body;
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Comments app listening at http://%s:%s", host, port);
});
