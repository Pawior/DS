const http = require("http");
const PORT = 3000;
const fs = require("fs");

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      fs.readFile("static/index.html", function (err, data) {
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

  req.on("data", function (data) {
    console.log("data: " + data);
    body += data.toString();
  });

  req.on("end", function (data) {
    console.log(body);
    const params = new URLSearchParams(body);
    const finishObj = Object.fromEntries(params);
    let wynik = eval(
      `${finishObj.liczba1}${finishObj.select}${finishObj.liczba2}`
    );
    console.log(wynik);
    console.log(finishObj);
    let wynikObj = {};
    wynikObj.wynik = wynik;
    wynikObj["wynik2"] = wynik;
    // wynikObj.push({ test: wynik });
    console.log(wynikObj);
    res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(wynikObj, null, 5));
  });
}

server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
});
