let { imagesArray } = require("./model.js");
let { tagsArray, tagsObjArray } = require("./tagsList");

module.exports = {
  getAllRaw: () => {
    console.log(tagsArray);
    console.log("tagsArray");
    return tagsArray;
  },
  getAllObj: () => {
    console.log(tagsObjArray);
    console.log("tagsObjArray");
    return tagsObjArray;
  },
  getSpecific: (id) => {
    return tagsObjArray[id];
  },
  addToArray: (data) => {
    let parsedData = JSON.parse(data);
    let tempObjToAdd = {
      id: parseInt(tagsObjArray.length),
      name: parsedData.name,
      popularity: parsedData.popularity,
    };
    tagsObjArray.push(tempObjToAdd);
    console.log(parsedData);
  },
};
