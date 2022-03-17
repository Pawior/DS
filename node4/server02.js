const fsPromises = require("fs").promises
const path = require("path")

const filepath = path.join(__dirname, "files", "file21.txt")
const filepath2 = path.join(__dirname, "files", "file22.txt")
const filepath3 = path.join(__dirname, "files", "file23.txt")

const opers = async () => {
    try {
        //operacje
        console.log(new Date().getMilliseconds());
        const data = await fsPromises.readFile(filepath, "utf-8")
        console.log(data, new Date().getMilliseconds());
        await fsPromises.writeFile(filepath2, data)
        console.log(new Date().getMilliseconds());
        await fsPromises.appendFile(filepath2, "\n\nnowa linia")
        console.log(new Date().getMilliseconds());
        await fsPromises.rename(filepath2, filepath3)
        console.log(new Date().getMilliseconds());
        const data2 = await fsPromises.readFile(filepath3, "utf-8")
        console.log(data2, new Date().getMilliseconds());
    } catch (error) {
        console.log(error);
    }

}

opers()
