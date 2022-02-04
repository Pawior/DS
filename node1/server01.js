const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
  // parametr res oznacza obiekt odpowiedzi serwera (response)
  // parametr req oznacza obiekt żądania klienta (request)
});

server.listen(PORT, () => {
  console.log(`serwer startuje na porcie ${PORT}`);
});
