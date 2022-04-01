var express = require("express");
var hbs = require('express-handlebars');
var app = express();
const PORT = 3000;
var path = require("path")


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

const context = {
    subject: "ćwiczenie 3 - dane z tablicy obiektów",
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Dwór mgieł i furii", author: "S.J. Maas", lang: "CZ" }
    ]
}

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.use(express.json());

app.get("/", function (req, res) {
    res.render('view1.hbs', context)
})
app.get("/titles", function (req, res) {
    res.render('titles.hbs', context)
})
app.get("/login", function (req, res) {
    res.render('login.hbs')
})
