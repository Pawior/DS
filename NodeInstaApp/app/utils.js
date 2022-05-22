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

module.exports = getRequestData
