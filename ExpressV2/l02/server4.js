var express = require("express");
var app = express();
const PORT = 3000;

const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
let users = [
  { nick: "111", email: "111@w.pl" },
  { nick: "222", email: "222@w.pl" },
  { nick: "333", email: "333@w.pl" },
];
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/addUser.html");
});
app.post("/handleForm", function (req, res) {
  // console.log(req.body.nick);
  // console.log(req.body);
  var problem = false;
  // console.log(user == req.body);
  users.forEach((user) => {
    console.log(user.email);
    if (user.email == req.body.email) {
      problem = true;
      console.log(problem);
    }
  });
  // console.log(problem);
  if (problem) {
    res.status(404).send("taki email już jest dodany!");
  } else {
    users.push(req.body);
  }

  console.log(users);
  // users.nick = req.body.nick
  // users.email = req.body.email
});
app.get("/select", function (req, res) {
  let page = `<div style="width: 100%; height: 100%"><form action="/handleDelete" method="POST" name="users"> <button type="submit"> usun</button> <select name="nick" id="users" name="users">`;
  let returnOptions = "";
  for (var i = 0; i < users.length; i++) {
    returnOptions = `<option value="${users[i].nick}">${users[i].nick}</option>`;
    page = page.concat(returnOptions);
  }
  let endPage = "</select> </form> </div>";
  let finalPage = page.concat(endPage);
  res.send(page);
});
app.get("/radio", function (req, res) {
  res.sendFile(__dirname + "/static/addUser.html");
});
app.get("/checkbox", function (req, res) {
  res.sendFile(__dirname + "/static/addUser.html");
});
app.post("/handleDelete", function (req, res) {
  console.log(req.body.nick);
  console.log(users);
  console.log(users.indexOf(req.body.nick));
  users = users.filter((item) => {
    return !item.nick.includes(req.body.nick);
  });
  console.log(users);
  res.send(users);
});
