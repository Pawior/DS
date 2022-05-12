let { animalsArray } = require("./model.js");
let { Animal } = require("./model.js");
const formidable = require("formidable");

const fs = require("fs");
const path = require("path");

const form = formidable({});
form.uploadDir = __dirname + "/upload";
form.keepExtensions = true;

const parseForm = async (req) => {
  return new Promise((resolve) => {
    form.parse(req, function (err, fields, files) {
      if (err) {
        // Check for and handle any errors here.

        console.error(err.message);
      }
      //   res.writeHead(200, { "content-type": "text/plain;charset=utf-8" });
      //   res.end("<h1>file uploaded!</h1>");
      console.log(fields);
      resolve({ fields, files });
      // console.log(files)
    });
  });
};

const createDirectory = async (name) => {
  return new Promise((resolve) => {
    fs.mkdir(`./upload/${name[1]}`, (err) => {
      if (err) throw err;
      console.log("dodany");
      resolve("dodany");
    });
  });
};

const uploadImage = async (req) => {
  return new Promise((resolve) => {
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log("Error" + err);
        logger.warn(err);
      }
      console.log(files.file.name);
      resolve("stworzono image");
    });
  });
};

module.exports = {
  add: async (req) => {
    // console.log(req);
    let fieldsVar = await parseForm(req);
    console.log(fieldsVar);
    console.log(fieldsVar.files);
    await createDirectory(Object.keys(fieldsVar.files));
    await uploadImage(fieldsVar.files);

    // console.log("controller")
    // form.on("file", function () {
    //     console.log("file" + new Date().getTime())
    // })

    // form.on("progress", function (bytesReceived, bytesExpected) {
    //     console.log("progress ", bytesExpected, bytesReceived, new Date().getTime())
    // })

    // form.on("fileBegin", function (name, value) {
    //     console.log("fileBegin" + new Date().getTime())
    // })

    // form.on("end", function () {
    //     console.log("end" + new Date().getTime())
    // })
  },

  getAdded: () => {
    return animalsArray[animalsArray.length - 1];
  },
  delete: (id) => {
    console.log("delete");
    console.log(id);
    parsedId = JSON.parse(id);

    let deleted = animalsArray[parsedId];
    console.log(animalsArray);
    console.log(parsedId);
    animalsArray.splice(parsedId, 1);
    return deleted;
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
  getall: () => {
    return animalsArray;
  },
  getSpecific: (id) => {
    return animalsArray[id];
  },
};
