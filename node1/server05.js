const http = require("http");
const PORT = 3000;
require("colors");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "application/json;charset=utf-8" });
  res.end(`<h2> ${JSON.stringify(req.headers, null, 5)}</h2>`);
});

server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
  console.log("tekst na czerwono".red);
  console.log("tekst na zielono".green);
  console.log("tekst na tęczowo".rainbow);
});
