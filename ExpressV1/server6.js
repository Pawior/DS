var express = require("express");
var app = express();
var PORT = 3000;
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.listen(PORT, function () {
  console.log("Nasłuchuje na: " + PORT);
});
app.get("/", function (req, res) {
  pgNum = Math.floor(Math.random() * 999999);
  res.cookie(`cookie${pgNum}`, `${new Date(Date.now() + 1000 * 60 * 60 * 4)}`, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
    httpOnly: true,
  });
  // .send("cookieA zostało ustawione");

  //   console.log("cookies :  ", req.cookies);
  first = req.cookies[Object.keys(req.cookies)[0]];
  last =
    req.cookies[Object.keys(req.cookies)[Object.keys(req.cookies).length - 1]];
  console.log(first);
  console.log(last);
  res.send(`witaj, pierwszy raz byłeś na naszej stronie ${first}.
  ostatnio byłeś na naszej stronie ${last} temu`);
  //   console.log("cookies :  ", req.session.expires);
});
