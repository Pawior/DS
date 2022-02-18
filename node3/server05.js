const http = require("http");
const PORT = 3000;
const formidable = require("formidable")
const fs = require("fs");



const server = http.createServer((req, res) => {
    // console.log(`adres żądania: ${req.url}`)
    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            fs.readFile("static/index04.html", function (error, data) {
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
            let body = "";
            form.parse(req, function (err, fields, files) {
                if (err) {
                    console.log("Error" + err)
                    return res.end()
                }
                res.writeHead(200, {
                    'content-type': 'application/json',
                });
                // res.end(`<h1>${files.file.name}</h1>`);
                console.log(files.file.name);
                res.end(JSON.stringify(files.file));
            });


            break;
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)

});