const fsPromises = require("fs").promises
const path = require("path"
// if (!fs.existsSync("./newdir")) {
//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//     })
// }

// if (fs.existsSync("./newdir")) {
//     fs.rmdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("nie ma ");
//     })
// }
fs.readdir(__dirname, (err, files) => {
    if (err) throw err
    console.log("lista", files);
})