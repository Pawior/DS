const controllers = require("./controller")
const getRequestData = require("./utils.js")
let { animalsArray } = require("./model.js")
const fs = require("fs");
const { Module } = require("module");

const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            // strona views/index.html
            fs.readFile("./app/views/index.html", function (error, data) {
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

            if (req.url == "/add") {
                // odczytaj dane z body
                // użyj funkcji z controllera
                // odpowiedz do klienta
                let data = await getRequestData(req);
                console.log(data);
                controllers.add(data)
                res.end(JSON.stringify(controllers.getall(), null, 5));

            }
            else if (req.url == "/getall") {
                let data = await getRequestData(req);
                console.log(data);
                res.end(JSON.stringify(controllers.getall(), null, 5));
                //  pobierz dane z tablicy zwierząt i odpowiedz do klienta
            }
            else if (req.url == "/delete") {
                let data = await getRequestData(req);
                console.log(data);
                controllers.delete(data)
                res.end(JSON.stringify(controllers.getall(), null, 5));


                //  usuń dane z tablicy zwierząt i odpowiedz do klienta
            }
            else if (req.url == "/update") {
                let data = await getRequestData(req);
                console.log(data);
                controllers.update(data)
                res.end(JSON.stringify(controllers.getall(), null, 5));
                //  updatuj danye z tablicy zwierząt i odpowiedz do klienta
            }

            break;

    }
}

module.exports = router;