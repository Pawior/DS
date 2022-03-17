const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((request, response) => {
  // parametr res oznacza obiekt odpowiedzi serwera (response)
  // parametr req oznacza obiekt żądania klienta (request)
  //   res.writeHead(200, { "content-type": "text/plain;charset=utf-8" });
  //   //   res.end(`<h2> ${JSON.stringify(req.headers, null, 5)}</h2>`);
  //   //   res.end(`<h1>adres url żądania to: ${req.url}</h1>`);
  //   if (req.url == "/A") {
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     res.write(`<p style='color:red;'> Hej </p>`);
  //     res.end();
  //   }
  if (request.url == "/index.html") {
    fs.readFile("static/index.html", function (error, data) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    });
  } else if (request.url === "/style.css") {
    fs.readFile("static/style.css", function (error, data) {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(data);
      response.end();
    });
  } else if (request.url === "/script.js") {
    fs.readFile("static/script.js", function (error, data) {
      response.writeHead(200, { "Content-Type": "application/javascript" });
      response.write(data);
      response.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
});

require("colors");
console.log("tekst na czerwono".red);
console.log("tekst na zielono".green);
console.log("tekst na tęczowo".rainbow);
