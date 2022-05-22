let { imagesArray } = require("./model");
const formidable = require("formidable");
const form = formidable({});

const addToArray = async (fields) => {
  let imagePath = fields.files.file.path;
  let newImageName = imagePath.slice(imagePath.lastIndexOf("\\") + 1);

  return new Promise((resolve) => {
    let imgObject = {
      id: new Date().getTime(),
      album: fields.fields.album,
      originalName: fields.files.file.name,
      url: `./app/upload/${fields.fields.album}/${newImageName}`,
      lastChange: "original",
      history: [
        {
          status: "original",
          timestamp: new Date().toISOString(),
        },
      ],
    };
    imagesArray.push(imgObject);
    console.log(imagesArray);
    console.log(imgObject);
    resolve("dodane do array'a");
  });
};
const parseForm = async (req) => {
  return new Promise((resolve) => {
    form.parse(req, function (err, fields, files) {
      if (err) {
        // Check for and handle any errors here.

        console.error(err.message);
      }
      //   res.writeHead(200, { "content-type": "text/plain;charset=utf-8" });
      //   res.end("<h1>file uploaded!</h1>");
      console.log("fields");
      console.log(fields);
      resolve({ fields, files });
      // console.log(files)
    });
  });
};

module.exports = {
  getAll: (req) => {
    // delete require.cache[require.resolve("./fileController")];
    // let { imagesArray } = require("./fileController.js");
    // console.log(newImagesArray);
    console.log(imagesArray);
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
  add: async (req) => {
    console.log("DOOODAHE");
    let fieldsVar = await parseForm(req);
    await addToArray(fieldsVar);
  },
  getTagsOfPhoto: (id) => {
    console.log(id);
    let objToReturn = "Brak";
    imagesArray.forEach((elem) => {
      console.log(elem);
      if (elem.id == parseInt(id)) {
        objToReturn = {
          id: elem.id,
          tags: elem.tags,
        };
      }
    });

    return objToReturn;
  },
  updateHistory: (data) => {
    // try {
    //   let parsedData = JSON.parse(data);
    //   console.log(parsedData);
    //   console.log(data.id);
    // } catch (e) {
    //   console.log(e);
    // }
    // return parsedData;

    let parsedData = JSON.parse(data);
    console.log(parsedData);

    let newHistoryObj = {
      status: parsedData.status,
      timestamp: new Date().toISOString(),
    };

    imagesArray.forEach((elem) => {
      console.log(elem.id);
      console.log(parsedData.id);
      console.log(elem.history);
      if (elem.id == parseInt(parsedData.id)) {
        elem.history.push(newHistoryObj);
        return elem;
      }
    });
    console.log(data);
  },
  updateTag: (data) => {
    // try {
    //   let parsedData = JSON.parse(data);
    //   console.log(parsedData);
    //   console.log(data.id);
    // } catch (e) {
    //   console.log(e);
    // }
    // return parsedData;

    let parsedData = JSON.parse(data);
    console.log(parsedData);

    let newTagObj = {
      name: parsedData.name,
      popularity: parsedData.popularity,
    };

    imagesArray.forEach((elem) => {
      console.log(elem.id);
      console.log(parsedData.id);
      console.log(elem.history);
      if (elem.id == parseInt(parsedData.id)) {
        if (elem["tags"] != undefined) {
          elem.tags.push(newTagObj);
        } else {
          elem.tags = [];
          elem.tags.push(newTagObj);
        }
        return elem;
      }
    });
    console.log(data);
  },

  delete: (id) => {
    console.log("delete");
    console.log(id);
    console.log(parseInt(id));
    console.log(imagesArray[0].id);
    imagesArray = imagesArray.filter((elem) => elem.id != parseInt(id));
  },
};
