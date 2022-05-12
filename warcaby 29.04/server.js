/**--------------------------------------------
 *               Inicjalizacja
 *---------------------------------------------**/

var express = require("express");
var app = express();
const PORT = 3000;
var path = require("path");

app.use(express.json({ limit: "50mb" }));
app.use(express.static("static"));

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
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

let doesChange = false;
let pionek = {};
let newX = 0;
let newY = 0;
let colorPionkow = "";

/**----------------------
 *   GETY I POSTY
 *------------------------**/
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/page/index.html");
});

app.post("/post", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  users.push(req.body.user);
  console.log(users);
  res.send(req.body);
});
app.post("/checkUsers", function (req, res) {
  let arrLen = users.length;
  if (users.length) {
    res.send({ arrLen });
  }
});
app.post("/aktualizacja_tablicy", function (req, res) {
  console.log(req.body);
  doesChange = !doesChange;
  pionek = req.body.pionek;
  newX = req.body.newX;
  newY = req.body.newY;
  console.log(currentTab);
  let body = {
    pionek: pionek,
    newX: newX,
    newY: newY,
  };
  console.log(body);
  res.send(body);
});
app.post("/porownywanie_tablicy", function (req, res) {
  let body = {
    pionek: pionek,
    newX: newX,
    newY: newY,
  };
  // res.send([pionek, newX, newY, doesChange]);
  res.send(body);
});
app.post("/giveColor", function (req, res) {
  var random_boolean = Math.random() < 0.5;
  if (colorPionkow == "") {
    random_boolean ? (colorPionkow = "white") : (colorPionkow = "black");
  } else {
    colorPionkow == "white"
      ? (colorPionkow = "black")
      : (colorPionkow = "white");
  }
  res.send({ colorPionkow });
  console.log("Wysłałem");
  console.log(colorPionkow);
  // if (random_boolean) {
  //   colorPionkow = "white";
  // }
});
app.post("/didMove", function (req, res) {
  let moveOrder = {
    white: true,
    black: false,
  };
  let userColor = req.body;
  console.log(userColor);
});
