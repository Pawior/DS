var express = require("express");
var app = express();
var PORT = 3000;

var path = require("path");

app.listen(PORT, function () {
  console.log("Nasłuchuje na " + PORT);
});
app.get("/", function (req, res) {
  var stringToSend = `<div> `;
  for (var i = 0; i < 50; i++) {
    pgNum = Math.floor(Math.random() * 100);
    newString = `<a href="/product${pgNum}?id=${pgNum}" > page${pgNum}</a>`;
    var stringToSend = stringToSend.concat(newString);
  }
  var endStringToSend = `</div>`;
  var stringToSend = stringToSend.concat(endStringToSend);
  res.send(stringToSend);
});
app.all("*", function (req, res) {
  console.log(req.originalUrl);
  console.log(req.path);
  console.log(req.query.id);
  console.log(req.baseUrl);
  res.send(`To jest produkt o id = ${req.query.id}`);
});
