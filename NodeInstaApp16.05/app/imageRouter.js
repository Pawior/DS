const controllers = require("./fileController.js");
const jsonControllers = require("./jsonController.js");
const getRequestData = require("./utils.js");
const fs = require("fs");
const { Module } = require("module");

const imageRouter = async (req, res) => {
  if (
    req.url.match(/\/api\/photos\/tags\/([0-9a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    let data = await getRequestData(req);
    // console.log(jsonControllers.getAll(data));
    let reqUrl = req.url;
    let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    res.end(JSON.stringify(jsonControllers.getTagsOfPhoto(id), null, 5));
  } else if (req.url == "/api/photos" && req.method == "GET") {
    let data = await getRequestData(req);
    // console.log(jsonControllers.getAll(data));
    res.end(JSON.stringify(jsonControllers.getAll(), null, 5));
  } else if (
    req.url.match(/\/api\/photos\/([0-9a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    let data = await getRequestData(req);
    let reqUrl = req.url;
    let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    console.log(id);
    res.end(JSON.stringify(jsonControllers.getSpecific(id), null, 5));
  }
  // POST
  else if (req.url == "/api/photos" && req.method == "POST") {
    controllers.add(req);
    jsonControllers.add(req);
  }
  // PATCH
  else if (req.url == "/api/photos/tags" && req.method == "PATCH") {
    let data = await getRequestData(req);
    await jsonControllers.updateTag(data);
    res.end(JSON.stringify(jsonControllers.getAll(), null, 5));
  } else if (req.url == "/api/photos" && req.method == "PATCH") {
    let data = await getRequestData(req);
    await jsonControllers.updateHistory(data);
    res.end(JSON.stringify(jsonControllers.getAll(), null, 5));
  }
  // DELETE
  else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
    let reqUrl = req.url;
    let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    // controllers.delete(id)
    controllers.delete(id);
    jsonControllers.delete(id);
    // res.end(JSON.stringify(jsonControllers.delete(id), null, 5));
    res.end("Usuniete");
  } else {
    res.end("Nie znaleziono metody");
  }
};

module.exports = imageRouter;
