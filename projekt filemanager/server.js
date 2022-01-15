var express = require("express");
var hbs = require('express-handlebars');
var app = express();
const PORT = 3000;
var path = require("path")
var hbs = require('express-handlebars');
var formidable = require('formidable');




app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

const context = {

    t: [
        { a: 1, b: 1 },
        { a: 2, b: 2 }
    ]

}
let filesArr = []

let isLogged = false

app.listen(PORT, function () {
    console.log("Działam")
})
app.use(express.json());
app.use(express.static("static"))
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.render('mainPage.hbs');
})

app.get("/main", function (req, res) {
    res.render('mainPage.hbs');
})
app.get("/upload", function (req, res) {
    res.render('upload.hbs');
})
app.post('/handleUpload', function (req, res) {

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.keepExtensions = true
    form.multiples = true
    form.parse(req, function (err, fields, files) {

        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);
        let idx = 0
        files.imageupload.forEach(file => {
            idx++
            // console.log(file.name)
            iconName = file.type.split("/")
            if (iconName[1] !== "jpeg" || iconName[1] !== "plain" || iconName[1] !== "png") {
                iconName[1] = "unknown"
            }
            let Elem = {
                id: idx,
                img: iconName[1],
                name: file.name,
                size: file.size,
                type: file.type
            }
            filesArr.push(Elem)
        })
        console.log(filesArr)
        res.redirect("/filemanager")
    });

});
app.get("/register", function (req, res) {
    res.render('registerPage.hbs');
    console.log(req.query)
    tab.push(req.query)
    console.log(tab)
    res.redirect("/admin")
})
app.get("/filemanager", function (req, res) {
    res.render('fileManager.hbs', { filesArr: filesArr });

})
