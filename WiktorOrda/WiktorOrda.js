const http = require("http");
const PORT = 3000;
require("colors");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  //   res.end(`<h2> ${req.url}</h2>`);
  let letter = req.url.toLowerCase();
  letter = letter.replace("/", "");
  console.log(letter);
  switch (letter) {
    case "a":
      res.end(`<h2 style="color:green"> kolorowe</h2>`);
      break;
    case "b":
      res.end(`<h2 style="color:purple"> kolorowe</h2>`);
      break;
    case "c":
      res.end(`<h2 style="color:red"> kolorowe</h2>`);
      break;
    default:
  }
});

server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
});
