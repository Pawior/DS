var express = require("express")
var app = express()
const PORT = 4000;

app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.get('/', function (req, res) {
    console.log("ds")
    res.status(404).send("brak strony takiego produktu")
})