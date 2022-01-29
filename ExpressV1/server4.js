var express = require("express");
var app = express();
const PORT = 3000;

var path = require("path");

app.listen(PORT, function () {
  console.log("Nasłuchuje na " + PORT);
  console.log("Sciezka domowa to: " + __dirname);
});
app.get("/product_id/1", function (req, res) {
  res.sendFile(`${__dirname}/static/pages/products/product1.html`);
});
app.get("/product_id/2", function (req, res) {
  res.sendFile(`${__dirname}/static/pages/products/product2.html`);
});
app.get("/product_id/", function (req, res) {
  console.log("test");
  res.status(404).send("brak strony takiego produktu 2");
});
app.get("/", function (req, res) {
  console.log("test");
  res.status(404).send("brak strony takiego produktu");
});
app.all("*", function (req, res) {
  res.status(404).send("brak strony takiego produktu");
});
app.use(express.static("static"));
