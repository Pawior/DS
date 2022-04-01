var express = require("express");
var hbs = require('express-handlebars');
var app = express();
const PORT = 3000;
var path = require("path")


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

const context = {

    t: [
        { a: 1, b: 1 },
        { a: 2, b: 2 }
    ]

}
var tab = []

let isLogged = false

app.listen(PORT, function () {
    console.log("Działam")
})
app.use(express.json());
app.use(express.static("static"))

app.get("/", function (req, res) {
    res.render('mainPage.hbs');
})

app.get("/main", function (req, res) {
    res.render('mainPage.hbs');
})
app.get("/admin", function (req, res) {
    if (isLogged) {
        res.render('adminAdminPage.hbs')
    } else {
        res.render('adminUserPage.hbs');
    }

})
app.get("/register", function (req, res) {
    res.render('registerPage.hbs');
    console.log(req.query)
    tab.push(req.query)
    console.log(tab)
    res.redirect("/admin")
})
app.get("/login", function (req, res) {
    res.render('loginPage.hbs');

})