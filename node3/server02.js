const http = require("http");
const PORT = 3000;
const formidable = require("formidable")
const fs = require("fs");



const server = http.createServer((req, res) => {
    console.log(`adres żądania: ${req.url}`)
    // res.writeHead(200, {
    //     "content-type": "text/html;charset=utf-8"
    // })
    // res.end(`<h1>Elo</h1>`)
    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            fs.readFile("static/index.html", function (error, data) {
                if (error) {
                    res.writeHead(404, {
                        "Content-Type": "text/html"
                    });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "POST":
            const form = formidable({});
            form.uploadDir = "static/upload/"
            form.keepExtensions = true;
            form.on("file", function () {
                console.log("file" + new Date().getTime())
            })

            form.on("progress", function (bytesReceived, bytesExpected) {
                console.log("progress ", bytesExpected, bytesReceived, new Date().getTime())
            })

            form.on("fileBegin", function (name, value) {
                console.log("fileBegin" + new Date().getTime())
            })

            form.on("end", function () {
                console.log("end" + new Date().getTime())
            })
            form.parse(req, function (err, fields, files) {
                res.writeHead(200, {
                    'content-type': 'text/plain;charset=utf-8'
                });
                res.end('wszystkich bajtów w formularzu:' + form.bytesExpected + " / " + form.bytesReceived + " bytes");
            });


            break;
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)

});