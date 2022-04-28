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
    getAdded: () => {
        return animalsArray[animalsArray.length - 1];
    },
    delete: (id) => {
        console.log("delete")
        console.log(id)
        parsedId = JSON.parse(id);

        let deleted = animalsArray[parsedId]
        console.log(animalsArray)
        console.log(parsedId)
        animalsArray.splice(parsedId, 1)
        return deleted;
        //return animalsArray;

        // usuwanie po id z animalsArray
    },
    update: (data) => {
        console.log("delete")
        console.log(data)
        parsedData = JSON.parse(data);
        console.log(parsedData)
        console.log(parsedData.id)
        animalsArray[parsedData.id].name = "Żyrafa"
        // update po id elementu animalsArray
    },
    getall: () => {
        return animalsArray
    },
    getSpecific: (id) => {
        return animalsArray[id];
    }

}