var express = require("express")
var app = express()
const PORT = 3000;
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/formularz.html")
})
app.post("/handleForm", function (req, res) {
    console.log(req.body)
    let page = `<div style="width: 100%; height: 100%;background-color:${req.body.color}">${req.body.color} </div>`
    res.send(page)
})
app.use(express.static("static"))