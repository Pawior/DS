const controllers = require("./fileController.js");
const jsonControllers = require("./jsonController.js");
const getRequestData = require("./utils.js");
const saveToFile = require("./utils.js");
let { animalsArray } = require("./model.js");
const fs = require("fs");
const { Module } = require("module");

const router = async (req, res) => {
  if (req.url == "/api/photos" && req.method == "GET") {
    let data = await getRequestData(req);
    console.log(jsonControllers.getAll(data));
    res.end(JSON.stringify(jsonControllers.getAll(), null, 5));
  } else if (
    req.url.match(/\/api\/photos\/([0-9a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    let data = await getRequestData(req);
    // console.log(data);
    let reqUrl = req.url;
    // let id = reqUrl.substr(reqUrl.length - 1);
    let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);

    // controllers.getall(data)
    console.log(id);
    res.end(JSON.stringify(jsonControllers.getSpecific(id), null, 5));
  } else if (req.url == "/api/photos" && req.method == "POST") {
    // let data = await getRequestData(req);
    // let save = await saveToFile(data)
    // console.log(req);
    // console.log(req);
    controllers.add(req);
    // res.end(JSON.stringify(req, null, 5));
  } else if (req.url == "/api/photos" && req.method == "PATCH") {
    // res.writeHead(200, { "Content-Type": "application/json" });
    let data = await getRequestData(req);
    await jsonControllers.updateHistory(data);
    res.end(JSON.stringify(jsonControllers.getAll(), null, 5));
  } else if (
    req.url.match(/\/api\/photos\/([0-9]+)/) &&
    req.method == "DELETE"
  ) {
    let reqUrl = req.url;
    let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    // controllers.delete(id)
    controllers.delete(id);
    res.end(JSON.stringify(jsonControllers.delete(id), null, 5));
  } else {
    res.end("Nie znaleziono metody");
  }
};

module.exports = router;
