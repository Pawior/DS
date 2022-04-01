var express = require("express")
var app = express()
const PORT = 3000;

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/formularz.html")
})
app.get("/handleForm", function (req, res) {
    console.log(req.query.color)
    let page = `<div style="width: 100%; height: 100%;background-color:${req.query.color}">${req.query.color} </div>`
    res.send(page)
})
app.use(express.static("static"))