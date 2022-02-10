const http = require("http");
const fs = require("fs");
const PORT = 3000;
const server = http.createServer((req, res) => {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      //wyświetlenie strony html
      fs.readFile("static/zadanie04.html", function (error, data) {
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
      serverResponse(req, res);
      break;
  }
  //   res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
  //   res.end("elo");
});
const serverResponse = (req, res) => {
  console.log("mamy posta");
  let body = "";
  req.on("data", function (data) {
    console.log("data: " + data);
    body += data.toString();
  });
  req.on("end", function (data) {
    console.log(body);
    const params = new URLSearchParams(body);
    const finishObj = Object.fromEntries(params);
    console.log(finishObj);
    let suma = parseInt(finishObj.a) + parseInt(finishObj.b);
    finishObj.suma = suma;
    iloczyn = parseInt(finishObj.a) * parseInt(finishObj.b);
    finishObj.iloczyn = iloczyn;
    let znak = finishObj.coRobic;
    let wynik = eval(`${finishObj.a} ${znak} ${finishObj.b}`);
    finishObj.wynikWybranegoDzialania = wynik;
    res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(finishObj, null, 5));
  });
};

server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
});
