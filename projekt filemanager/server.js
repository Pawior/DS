var express = require("express");
var hbs = require("express-handlebars");
var app = express();
const PORT = 3000;
var path = require("path");
var hbs = require("express-handlebars");
var formidable = require("formidable");

app.set("views", path.join(__dirname, "views")); // ustalamy katalog views
app.engine("hbs", hbs({ defaultLayout: "main.hbs" })); // domyślny layout, potem można go zmienić
app.set("view engine", "hbs");

const context = {
  t: [
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ],
};
let filesArr = [];

let isLogged = false;

app.listen(PORT, function () {
  console.log("Działam");
});
app.use(express.json());
app.use(express.static("static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("mainPage.hbs");
});

app.get("/main", function (req, res) {
  res.render("mainPage.hbs");
});
app.get("/upload", function (req, res) {
  res.render("upload.hbs");
});
app.post("/handleUpload", function (req, res) {
  let form = formidable({});

  form.uploadDir = __dirname + "/static/upload/"; // folder do zapisu zdjęcia
  form.keepExtensions = true;
  form.multiples = true;
  form.parse(req, function (err, fields, files) {
    console.log("----- przesłane pola z formularza ------");

    console.log(fields);

    console.log("----- przesłane formularzem pliki ------");

    console.log(files);
    let idx = 0;
    if (!Array.isArray(files.imageupload)) {
      const file = files.imageupload;
      iconName = file.type.split("/");
      console.log(typeof iconName[1]);
      if (
        iconName[1] == "jpeg" ||
        iconName[1] == "plain" ||
        iconName[1] == "png"
      ) {
        null;
      } else iconName[1] = "unknown";
      console.log(iconName[1]);
      let Elem = {
        id: idx + 1,
        img: iconName[1],
        name: file.name,
        size: file.size,
        type: file.type,
        path: file.path,
      };
      filesArr.push(Elem);
    } else {
      files.imageupload.forEach((file) => {
        idx++;
        // console.log(file.name)
        iconName = file.type.split("/");
        console.log(typeof iconName[1]);
        if (
          iconName[1] == "jpeg" ||
          iconName[1] == "plain" ||
          iconName[1] == "png"
        ) {
          null;
        } else iconName[1] = "unknown";
        console.log(iconName[1]);
        let Elem = {
          id: idx,
          img: iconName[1],
          name: file.name,
          size: file.size,
          type: file.type,
          path: file.path,
        };
        filesArr.push(Elem);
      });
    }
    console.log(filesArr);
    res.redirect("/filemanager");
  });
});
app.get("/register", function (req, res) {
  res.render("registerPage.hbs");
  console.log(req.query);
  tab.push(req.query);
  console.log(tab);
  res.redirect("/admin");
});
app.get("/delete", function (req, res) {
  let fileId = req.query.id;
  if (fileId == "all") {
    filesArr = [];
  }
  filesArr = filesArr.filter((file) => {
    if (file.id != fileId) {
      return file;
    }
  });
  console.log(fileId);
  console.log(filesArr);
  res.redirect("/filemanager");
});
app.get("/info", function (req, res) {
  let fileId = req.query.id;
  res.render("info.hbs", { filesArr: filesArr[fileId - 1] });
});
app.get("/filemanager", function (req, res) {
  res.render("fileManager.hbs", { filesArr: filesArr });
});
app.get("/download", function (req, res) {
  let aPath = req.query.path;
  console.log(aPath);
  let path = aPath.split(`\\`);
  console.log(path);
  let fileName = path[path.length - 1];
  console.log(fileName);
  let file = `${__dirname}/static/upload/${fileName}`;
  console.log(file);
  res.download(file);
  // res.render("fileManager.hbs", { filesArr: filesArr });
});
