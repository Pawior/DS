var express = require("express");
var app = express();
const PORT = 3000;

app.listen(PORT, function () {
  console.log("serwer startuje na porcie: " + PORT);
});
app.get("/", function (req, res) {
  console.log(req.query);
  console.log(req.query.value);
  console.log(req.query.toRad);
  deg = req.query.value;
  var result = 0;
  if (req.query.toRad) {
    result = (req.query.value * 2 * Math.PI) / 360;
  }
  console.log(result);
  console.log(req.query.value);
  res.send(result.toString());
});
app.use(express.static("static"));
