let { animalsArray } = require("./model.js")
let { Animal } = require("./model.js")

module.exports = {
    add: (data) => {
        console.log("controller")
        console.log(data)
        parsedData = JSON.parse(data);
        console.log(parsedData)
        let newAnimal = new Animal(parsedData.name, parsedData.color);
        animalsArray.push(newAnimal)
        console.log(animalsArray)
        // return animalsArray;
        // utwórz obiekt klasy Animal
        // dodaj do animalsArray
    },
    delete: (id) => {
        console.log("delete")
        console.log(id)
        parsedId = JSON.parse(id);
        animalsArray.splice(parsedId.id, 1)
        //return animalsArray;

        // usuwanie po id z animalsArray
    },
    update: (id) => {
        console.log("delete")
        console.log(id)
        parsedId = JSON.parse(id);
        animalsArray[parsedId.id].update()

        // update po id elementu animalsArray
    },
    getall: () => {
        return animalsArray
    }

}