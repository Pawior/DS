var express = require("express");
var hbs = require('express-handlebars');
var app = express();
const PORT = 3000;
var path = require("path")


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.use(express.json());

app.get("/", function (req, res) {
    res.render('view1.hbs')
})
app.get("/index", function (req, res) {
    res.render('index.hbs')
})
app.get("/login", function (req, res) {
    res.render('login.hbs')
})
