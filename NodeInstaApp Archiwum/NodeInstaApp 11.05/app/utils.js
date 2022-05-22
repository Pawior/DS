const fs = require("fs")
const path = require("path")

getRequestData = async (req) => {

    return new Promise((resolve, reject) => {
        try {

            let body = "";

            req.on("data", (part) => {
                body += part.toString();
            });

            req.on("end", () => {
                // mamy dane i zwracamy z promisy
                resolve(body);
            });
            console.log(body);

        } catch (error) {
            reject(error);
        }
    })

}

saveToFile = async (data) => {

    return new Promise((resolve, reject) => {
        try {

            // mamy dane i zwracamy z promisy
            const filepath2 = path.join(__dirname, "files", "file01.txt")
            fs.writeFile(filepath2, "tekst do wpisania", (err) => {
                if (err) throw err
                console.log("plik nadpisany");
            })
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })

}

module.exports = getRequestData
module.exports = saveToFile