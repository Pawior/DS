var express = require("express");
var hbs = require("express-handlebars");
var app = express();
const PORT = 3000;
var path = require("path");

app.set("views", path.join(__dirname, "views")); // ustalamy katalog views
app.engine("hbs", hbs({ defaultLayout: "main.hbs" })); // domyślny layout, potem można go zmienić
app.set("view engine", "hbs");

const context = {
  t: [
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ],
};
var tab = [
  { id: 1, login: "aaa", pass: "123", wiek: 10, uczen: "checked", plec: "m" },
  {
    id: 2,
    login: "test",
    pass: "123",
    wiek: 20,
    uczen: "unchecked",
    plec: "k",
  },
  {
    id: 3,
    login: "ania",
    pass: "aaa",
    wiek: 30,
    uczen: "checked",
    plec: "k",
  },
];
let startId = 4;
let isLogged = false;

app.listen(PORT, function () {
  console.log("Działam");
});
app.use(express.json());
app.use(express.static("static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("mainPage.hbs");
});

app.get("/main", function (req, res) {
  res.render("mainPage.hbs");
});
app.get("/admin", function (req, res) {
  if (isLogged) {
    res.render("adminAdminPage.hbs");
  } else {
    res.render("adminUserPage.hbs");
  }
});
app.get("/register", function (req, res) {
  res.render("registerPage.hbs");
  //   console.log(req.body);
  //   console.log("req.body");
  //   console.log(req.query);
  //   tab.push(req.query);
  //   console.log(tab);
  //   res.redirect("/admin");
});
app.post("/register", function (req, res) {
  console.log(req.body);
  let uczen = "";
  if (req.body.uczen) {
    uczen = "checked";
  } else uczen = "unchecked";
  let data = {
    id: startId,
    login: req.body.login,
    pass: req.body.pass,
    wiek: parseInt(req.body.age),
    uczen: uczen,
    plec: req.body.plec,
  };
  tab.push(data);
  console.log(tab);
  isLogged = true;
  startId++;
});
app.get("/login", function (req, res) {
  res.render("loginPage.hbs");
});
app.post("/login", function (req, res) {
  console.log(req.body);
  tab.forEach((item) => {
    if (item.login == req.body.login) {
      console.log("Zalogowano");
      isLogged = true;
    }
    console.log(item.login);
  });
});
app.get("/logout", function (req, res) {
  isLogged = false;
  res.redirect("/login");
});
app.get("/sort", function (req, res) {
  console.log(req.query.sort);
  let sorting = true;
  sortedTab = [...tab];
  if (req.query.sort == undefined || req.query.sort == "rosnaco") {
    sorting = true;
    sortedTab = [...tab].sort(function (a, b) {
      return parseFloat(a.wiek) - parseFloat(b.wiek);
    });
  } else {
    sorting = false;
    sortedTab = [...tab].sort(function (a, b) {
      return parseFloat(b.wiek) - parseFloat(a.wiek);
    });
  }

  res.render("sortPage.hbs", { tab: sortedTab, sorting: sorting });
});
app.get("/show", function (req, res) {
  let tabToShow = tab.map((item) => {
    if (item.uczen == "unchecked" || item.uczen == "") {
      return (item.uczen = "");
    } else return (item.uczen = true);
  });
  console.log(tabToShow);
  console.log(tab);
  res.render("showPage.hbs", { tab: tab });
});
