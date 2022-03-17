/**--------------------------------------------
 *               Inicjalizacja
 *---------------------------------------------**/

var express = require("express");
var app = express();
const PORT = 3000;
var path = require("path");

app.use(express.json());
app.use(express.static("static"));

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});

/**----------------------
 *    Zmienne
 *------------------------**/

let users = [];

/**----------------------
 *   GETY I POSTY
 *------------------------**/
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/page/index.html");
});

app.post("/post", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(req.body);
  users.push(req.body.user);
  console.log(users);
  res.send(req.body);
});
