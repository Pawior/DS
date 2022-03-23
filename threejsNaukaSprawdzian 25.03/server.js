var express = require("express");
const fs = require("fs");
var app = express();
const PORT = 3000;

app.use(express.static("static"));
app.use(express.static("static/pages"));

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});

const filesArr = [
  "indexTest.html",
  "index01.html",
  "index02.html",
  "index03.html",
];

app.get("/", function (req, res) {
  fs.readdir(__dirname, function (err, files) {
    if (err) {
      return console.log(err);
    }
    let strReturn = "";
    filesArr.forEach(function (file) {
      strReturn += `<a href="/pages/${file}"> ${file}</a> <br />`;
    });
    return res.send(strReturn);
    console.log(files);
  });
});

app.get("/pages/indexTest.html", function (req, res) {
  res.sendFile(__dirname + "/static/pages/indexTest.html");
});
