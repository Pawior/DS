let { imagesArray } = require("./model.js");

module.exports = {
  getAll: (req) => {
    return imagesArray;
  },
  getSpecific: (id) => {
    console.log(id);
    let toReturn;
    imagesArray.forEach((elem) => {
      console.log(elem);
      if (elem.id == parseInt(id)) {
        toReturn = elem;
        return elem;
      }
    });
    return toReturn;
  },
  updateHistory: (data) => {
    try {
      parsedData = JSON.parse(data);
      console.log(parsedData);
      console.log(data.id);
    } catch (e) {
      console.log(e);
    }

    // console.log(parsedData.id);

    // parsedData = JSON.parse(data);

    // imagesArray.
  },

  delete: (id) => {
    console.log("delete");
    console.log(id);
    console.log(parseInt(id));
    console.log(imagesArray[0].id);
    imagesArray = imagesArray.filter((elem) => elem.id != parseInt(id));

    return imagesArray;
  },
};
