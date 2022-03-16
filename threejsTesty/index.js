var express = require("express");
var app = express();
const fs = require("fs");
app.use(express.static("static")); // serwuje stronę index.html
app.use(express.static("static/cwiczenia")); // serwuje pozostałe pliki, czyli ćwiczenia
var PORT = 3000; //
// przykładowy get obsługujący żądanie Ajax-a
const filesArr = ["cw01.html"];

app.listen(PORT, () => {
  console.log("Nasluchuje na porcie: " + PORT);
});
app.get("/cwiczenia", function (req, res) {
  res.sendFile(__dirname + "/static/cwiczenia/" + filesArr[0]);
});
