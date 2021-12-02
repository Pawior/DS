var express = require("express")
var app = express()
const PORT = 3000;

// app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
// app.get('/', function (req, res) {
//     console.log(req.query) // to jest obiekt z danymi pobranymi z paska adresu    
//     console.log(req.query.p1) // to jest jedno pole (właściwość) tego obiektu   
//     res.send(req.query) // odesłanie obiektu z danymi z powrotem do przeglądarki   
// });
app.get('/', function (req, res) {
    res.status(403).send("brak strony takiego produktu")
})
app.get('/user/:id', function (req, res) {

    var id = req.params.id
    if (id == 2)
        res.send("odsyłam stronę usera z id = 2")
    else
        res.send("taki user nie istnieje")
});
