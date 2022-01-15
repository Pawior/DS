var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.get("/", function (req, res) {
    console.log(req.query)
    console.log(req.query.count)
    console.log(req.query.bg)
    var stringToSend = `<div style="display:flex; gap: 30px"> `;
    for (var i = req.query.count; i > 0; i--) {
        console.log(i)
        newString = `<div style="width: 100px; height: 100px; background-color:${req.query.bg}"> <p style="font-size:2rem"> ${i}</p> </div>`
        var stringToSend = stringToSend.concat(newString)
        console.log(stringToSend)
    }
    var endOfString = "</div>"
    var stringToSend = stringToSend.concat(endOfString)
    res.send(stringToSend)

})
app.use(express.static('static'))