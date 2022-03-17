const http = require("http");
const PORT = 3000;
const fsPromises = require("fs").promises
const fs = require("fs")
const path = require("path");

let filesArr;

const colorsPath = path.join(__dirname, "node_modules", "colors")
fs.readdir(colorsPath, (err, files) => {
    if (err) throw err
    console.log("lista", files);
    filesArr = [...files]
})


const server = http.createServer((req, res) => {
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
    switch (req.method) {
        case "GET":
            switch (req.url) {
                case "/":
                    fs.readFile("static/index.html", function (error, data) {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/fetch":
                    req.on("data", function (data) {
                        console.log("fetch doszedł")
                        console.log("data: " + data)
                        body += data.toString();

                    })
                    req.on("end", function (data) {
                        console.log("fetch jest");
                        res.writeHead(200, { "Content-type": "application/json" });
                        res.end(JSON.stringify(filesArr, null, 5));
                    });
                    break;
            }

            // req.on("data", function (data) {
            //     console.log("fetch doszedł")
            //     console.log("data: " + data)
            //     body += data.toString();

            // })
            // req.on("end", function (data) {
            //     console.log("fetch jest");
            //     res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
            //     res.end(JSON.stringify(filesArr, null, 5));
            // });

            // serverResponse(req, res)
            // function serverResponse(){

            // }
            break;
        case "POST":
            // odbiór posta
            serverResponse(req, res)

            break;
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});