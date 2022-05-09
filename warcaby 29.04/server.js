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
app.use(
  express.urlencoded({
    extended: true,
  })
);

/**----------------------
 *    Zmienne
 *------------------------**/

let users = [];

let startTab = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
];
let currentTab = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
];

/**----------------------
 *   GETY I POSTY
 *------------------------**/
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/page/index.html");
});

app.post("/post", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  // console.log(req.body);
  users.push(req.body.user);
  console.log(users);
  res.send(req.body);
});
app.post("/checkUsers", function (req, res) {
  if (users.length == 2) {
    res.send(true);
  } else {
    res.send(false);
  }
});
app.post("/aktualizacja_tablicy", function (req, res) {
  console.log(req.body);
  // console.log(req.body.pionki);
  currentTab = [...req.body.pionki];
  console.log(currentTab);
  res.send(currentTab);
});
app.post("/porownywanie_tablicy", function (req, res) {
  res.send(currentTab);
});
