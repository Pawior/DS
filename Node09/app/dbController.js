const { rejects } = require("assert")
const dbConnect = require("./dbConnect.js")
let { animalsArray } = require("./model.js")
let { Animal } = require("./model.js")


let db;
let col1;

const createCollection = async (db) => {
    return new Promise((resolve, reject) => {
        try {
            db.createCollection("col1", (err, col1) => {
                console.log("kolekcja powstała, sprawdź w konsoli klienta mongo")
                resolve(col1)
            })
        }
        catch (err) {
            reject(err.message)
        }
    })
}

const readyDb = async () => {
    db = await dbConnect();
    // console.log(db);
    col1 = createCollection(db)
}

module.exports = {
    add: async (data) => {
        // console.log(data)
        // let parsedData = JSON.parse(data);
        // console.log(parsedData)

        return new Promise((resolve, reject) => {
            try {
                col1.insert({ name: "test" }, (err, result) => {
                    console.log("dokument powstał, sprawdź efekt w konsoli klienta mongo")
                });
            }
            catch (err) {
                reject(err.message)
            }
        })
        // console.log("controller")
        // console.log(data)
        // parsedData = JSON.parse(data);
        // console.log(parsedData)
        // let newAnimal = new Animal(parsedData.name, parsedData.color);
        // animalsArray.push(newAnimal)
        // console.log(animalsArray)
        // return animalsArray;
        // utwórz obiekt klasy Animal
        // dodaj do animalsArray
    },
    getAdded: () => {
        return animalsArray[animalsArray.length - 1];
    },
}
readyDb();