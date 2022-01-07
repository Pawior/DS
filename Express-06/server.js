const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku

app.get("/", function (req, res) {
  res.send("Heroku app - Wiktor Orda 3I1");
});
app.get("/data", function (req, res) {
  res.send({ imie: "Wiktor", nazwisko: "Orda", klasa: "3I1", grupa: "2" });
});

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
