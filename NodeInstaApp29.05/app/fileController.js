let { imagesArray } = require("./model.js");
const formidable = require("formidable");
let animalsArray = [];

const fs = require("fs");
const path = require("path");
const { resolve } = require("path");

const form = formidable({});
form.keepExtensions = true;
form.uploadDir = __dirname + "/upload";
// const uploadFolder = path.join(__dirname, "upload", "files");

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

const createDirectory = async (name) => {
  console.log("name");
  console.log(name);

  // form.uploadDir = __dirname + `/upload/${name.album}`;

  return new Promise((resolve) => {
    fs.mkdir(`./app/upload/nazwa_albumu`, (err) => {
      if (err) throw err;
      console.log("dodany");
      resolve("dodany");
    });
  });
};

const uploadImage = async (req) => {
  try {
    return new Promise((resolve, reject) => {
      try {
        form.parse(req, function (err, fields, files) {
          try {
            console.log(files.file.name);
            resolve("stworzono image");
          } catch (err) {
            reject(err);
          }
          // if (err) {
          //   console.log("Error" + err);
          //   resolve(err);
          // }
        });
      } catch (err) {
        reject(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const renameDirectory = async (newName) => {
  return new Promise((resolve) => {
    try {
      fs.rename(
        `./app/upload/nazwa_albumu`,
        `./app/upload/${newName.album}`,
        (err) => {
          if (err) throw err;
          console.log("nazwa zmieniona");
          resolve("sukces");
        }
      );
    } catch (e) {
      console.log(e);
    }
  });
};
const moveImage = async (oldPath, newName) => {
  let newImageName = oldPath.slice(oldPath.lastIndexOf("\\") + 1);
  return new Promise((resolve) => {
    try {
      fs.rename(
        oldPath,
        `./app/upload/${newName.album}/${newImageName}`,
        (err) => {
          if (err) throw err;
          console.log("nazwa zmieniona");
          resolve(newImageName);
        }
      );
    } catch (e) {
      console.log(e);
    }
  });
};

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

module.exports = {
  add: async (req) => {
    // console.log(req);
    let fieldsVar = await parseForm(req);
    console.log(fieldsVar);
    console.log(fieldsVar.files);
    // await createDirectory(Object.keys(fieldsVar.files));
    await createDirectory(fieldsVar.fields);
    try {
      await uploadImage(fieldsVar.files);
    } catch (error) {
      console.log(error);
    }
    await renameDirectory(fieldsVar.fields);
    await moveImage(fieldsVar.files.file.path, fieldsVar.fields);
    await addToArray(fieldsVar);

    // await addToArray(fieldsVar);
  },

  getAdded: () => {
    return animalsArray[animalsArray.length - 1];
  },
  delete: (id) => {
    let toDelete = imagesArray.find((elem) => elem.id === parseInt(id));
    console.log(toDelete.album);
    fs.rmdir(`./app/upload/${toDelete.album}`, { recursive: true }, (err) => {
      if (err) throw err;
      console.log("nie ma ");
    });
    // console.log("delete");
    // console.log(id);
    // parsedId = JSON.parse(id);

    // let deleted = animalsArray[parsedId];
    // console.log(animalsArray);
    // console.log(parsedId);
    // animalsArray.splice(parsedId, 1);
    // return deleted;
    //return animalsArray;

    // usuwanie po id z animalsArray
  },
  update: (data) => {
    console.log("delete");
    console.log(data);
    parsedData = JSON.parse(data);
    console.log(parsedData);
    console.log(parsedData.id);
    animalsArray[parsedData.id].name = "Żyrafa";
    // update po id elementu animalsArray
  },
  getAll: (req) => {
    // delete require.cache[require.resolve("./fileController")];
    // let { imagesArray } = require("./fileController.js");
    // console.log(newImagesArray);
    console.log(imagesArray);
    return imagesArray;
  },
  getSpecific: (id) => {
    return animalsArray[id];
  },
  imagesArray,
};
