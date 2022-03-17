const http = require("http");
const PORT = 3000;
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "static", "index.html");

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      //wyświetlenie strony html
      fs.readFile(indexPath, function (error, data) {
        if (error) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write("<h1>błąd 404 - nie ma pliku!<h1>");
          res.end();
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      });
      break;
    case "POST":
      // odbiór posta
      // serverResponse(req, res);
      const form = formidable({});
      form.uploadDir = "static/upload/";
      form.keepExtensions = true;

      form.parse(req, function (err, fields, files) {
        if (err) {
          console.error(err);
        }
        res.writeHead(200, {
          "content-type": "application/json;charset=utf-8",
          //   "content-type": "text/html;charset=utf-8",
        });
        console.log(files.file);
        let filePath = files.file.path;
        let ogName = {
          ogNazwa: files.file.name,
        };
        let newFilePath = path.join(
          __dirname,
          "/static/upload",
          `${ogName.ogNazwa}`
        );

        if (fs.existsSync(filePath)) {
          console.log("plik istnieje");
          fs.rename(filePath, newFilePath, (err) => {
            if (err) throw err;
            console.log("nazwa zmieniona");
          });
        } else {
          console.log("plik nie istnieje");
        }
        res.end(JSON.stringify(ogName));
      });

      break;
  }
});

function serverResponse(req, res) {
  let body = "";

  //kiedy przychodzą dane postem, w postaci pakietów
  //łącza się do jednej zmiennej "body"

  req.on("data", function (data) {
    console.log("data: " + data);
    body += data.toString();
  });

  //kiedy przyjdą już WSZYSTKIE dane
  //parsujemy je do obiektu
  //i odsyłamy do przeglądarki

  req.on("end", function (data) {
    console.log(body);
    const params = new URLSearchParams(body);
    const finishObj = Object.fromEntries(params);
    console.log(finishObj);
    res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(finishObj, null, 5));
  });
}
server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
});
