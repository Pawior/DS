const http = require("http");
const PORT = 3000;
const fs = require("fs");

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      fs.readFile("static/index2.html", function (err, data) {
        if (err) {
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
      serverResponse(req, res);

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
    rdyJson = JSON.parse(body);
    // res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" }); idk ale oba działają
    res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
    res.end(JSON.stringify(rdyJson, null, 5));
  });
}

server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
});
