var express = require("express");
var app = express();
const PORT = 3000;

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/pages/page3.html")
})
app.post("/post", function (req, res) {
    // res.status(200).send(req.body)
    console.log(req.body)
    res.send(req.body)
})
app.use(express.static("static"))