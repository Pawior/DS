const http = require("http");
const PORT = 3000;
const fs = require("fs")
const path = require("path")
const fsPromises = require("fs").promises
const path = require("path")

// const server = http.createServer((req, res) => {
//     // parametr res oznacza obiekt odpowiedzi serwera (response)
//     // parametr req oznacza obiekt żądania klienta (request)
// })

// server.listen(PORT, () => {
//     console.log(`serwer startuje na porcie ${PORT}`)
// });
// const filepath = path.join(__dirname, "files", "file01.txt")
// fs.readFile(filepath, (err, data) => {
//     if (err) throw err
//     console.log(data.toString());
// })
// fs.writeFile(filepath, "nowy tekst", (err) => {
//     if (err) throw err
//     console.log("plik nadpisany")
// })
// fs.rename(filepath, "file02", (err) => {
//     if (err) throw err
//     console.log("nazwa zmieniona");
// })

const filepath3 = path.join(__dirname, "files", "file03.txt")
const filepath4 = path.join(__dirname, "files", "file04.txt")

fs.writeFile(filepath3, "tekst do zapisania", (err) => {
    if (err) throw err
    console.log("plik utworzony - czas 1: " + new Date().getMilliseconds());

    fs.appendFile(filepath3, "\n\ntekst do dopisania", (err) => {
        if (err) throw err
        console.log("plik zmodyfikowany - czas 2: " + new Date().getMilliseconds());

        fs.rename(filepath3, filepath4, (err) => {
            if (err) throw err
            console.log("nazwa zmieniona - czas 3: " + new Date().getMilliseconds());
        })
    })
})
