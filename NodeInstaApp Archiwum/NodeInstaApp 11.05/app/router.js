const controllers = require("./fileController.js");
const getRequestData = require("./utils.js");
const saveToFile = require("./utils.js");
let { animalsArray } = require("./model.js");
const fs = require("fs");
const { Module } = require("module");

const router = async (req, res) => {
  if (req.url == "/api/photos" && req.method == "GET") {
    let data = await getRequestData(req);
    controllers.getall(data);
    res.end(JSON.stringify(controllers.getall(), null, 5));
  } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    let data = await getRequestData(req);
    console.log(data);
    let reqUrl = req.url;
    let id = reqUrl.substr(reqUrl.length - 1);
    // controllers.getall(data)
    res.end(JSON.stringify(controllers.getSpecific(id - 1), null, 5));
  } else if (req.url == "/api/photos" && req.method == "POST") {
    // let data = await getRequestData(req);
    // let save = await saveToFile(data)
    // console.log(req);
    // console.log(req);
    controllers.add(req);
    // res.end(JSON.stringify(req, null, 5));
  } else if (req.url == "/api/photos" && req.method == "PATCH") {
    let data = await getRequestData(req);

    controllers.update(data);
    res.end(JSON.stringify(controllers.getAdded(), null, 5));
  } else if (
    req.url.match(/\/api\/photos\/([0-9]+)/) &&
    req.method == "DELETE"
  ) {
    let reqUrl = req.url;
    let id = reqUrl.substr(reqUrl.length - 1);
    // controllers.delete(id)
    res.end(JSON.stringify(controllers.delete(id), null, 5));
  } else {
    res.end("Nie znaleziono metody");
  }
};

module.exports = router;
