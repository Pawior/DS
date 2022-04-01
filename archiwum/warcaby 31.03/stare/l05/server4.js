var express = require("express");
var hbs = require('express-handlebars');
var app = express();
const PORT = 3000;
var path = require("path")


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

const context = {
    subject: "ćwiczenie 4 - dane z tablicy, select",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.use(express.json());

app.get("/", function (req, res) {
    res.render('index04.hbs', context)

})
app.get("/handleForm", function (req, res) {
    // console.log(req.query)
    let param = req.query
    // console.log(context.books)
    switch (param.fields) {
        case "title":
            // console.log(param.fields)
            var newContext = {
                array: []
            }
            for (var i = 0; i < context.books.length; i++) {
                var elem = { elem: context.books[i].title }
                newContext.array.push(elem)
            }
            console.log(newContext)
            res.render("index041.hbs", newContext)
            break;
        case "author":
            // console.log(param.fields)
            var newContext = {
                array: []
            }
            for (var i = 0; i < context.books.length; i++) {
                var elem = { elem: context.books[i].author }
                newContext.array.push(elem)
            }
            console.log(newContext)
            res.render("index041.hbs", newContext)
            break;
        case "lang":
            var newContext = {
                array: []
            }
            for (var i = 0; i < context.books.length; i++) {
                var elem = { elem: context.books[i].lang }
                newContext.array.push(elem)
            }
            console.log(newContext)
            res.render("index041.hbs", newContext)
            break;
        default:
            res.render("index041.hbs", context)
    }
    // console.log(context.books.req.query.fields)
    res.render("index041.hbs", context.books)
})
app.get("/titles", function (req, res) {
    res.render('titles.hbs', context)
})
app.get("/login", function (req, res) {
    res.render('login.hbs')
})
