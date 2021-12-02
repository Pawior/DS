var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.get('/', function (req, res) {
    console.log("test")
    res.status(404).send("brak strony takiego produktu")
})
app.get('/koty', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/index1.html"))
    console.log(__dirname)
})
app.get('/auta', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/index2.html"))
})
app.get('/drzewa', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/index3.html"))
})

app.use(express.static('static'))