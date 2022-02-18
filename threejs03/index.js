var express = require('express');
var app = express();
const fs = require('fs');
app.use(express.static("static")); // serwuje stronę index.html
app.use(express.static("static/cwiczenia"));
var PORT = 3000;

const filesArr = [
    "cw01.html",
    "cw02.html",
    "cw03.html",
    "cw05.html"
]

app.listen(PORT, function () {
    console.log("slucham na " + PORT)
})
app.get("/", function (req, res) {
    fs.readdir(__dirname + "/static/cwiczenia", function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(filesArr);
        let strReturn = "";
        filesArr.forEach((file) => {
            console.log(file);
            strReturn += `<a href="/cwiczenia/${file}">${file}</a><br/>`;
        });
        return res.send(strReturn);
    });
});

// app.get("/cwiczenia/cw03", (req, res) => {
//     res.sendFile(__dirname + "/static/cwiczenia/" + "cw03.html");
// });

module.exports = app;