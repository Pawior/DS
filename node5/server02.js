const http = require("http");
const fs = require("fs");
const PORT = 3000;
const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});
const server = http.createServer((req, res) => {
    console.log(req.method);
    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            fs.readFile("static/zadanie02.html", function (error, data) {
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
        // const params = new URLSearchParams(body);
        // const finishObj = Object.fromEntries(params);
        const finishObj = JSON.parse(body);
        var check = finishObj.hasOwnProperty("id")
        if (check == true) {
            coll1.remove({ _id: finishObj.id }, {}, function (err, numRemoved) {
                console.log("usunięto dokumentów: ", numRemoved)
            });
        } else {

            coll1.insert(finishObj, function (err, newDoc) {
                console.log("dodano dokument (obiekt):")
                console.log(newDoc)
                console.log("losowe id dokumentu: " + newDoc._id)
            });
        }
        console.log(finishObj);
        coll1.find({}, function (err, docs) {
            //zwracam dane w postaci JSON
            console.log("----- tablica obiektów pobrana z bazy: \n")
            console.log(docs)
            console.log("----- sformatowany z wcięciami obiekt JSON: \n")
            console.log(JSON.stringify({ "docsy": docs }, null, 5))
            res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
            res.end(JSON.stringify(docs, null, 5));
        });

    });
};

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`);
});
