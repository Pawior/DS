const tagsController = require("./tagsController");
const getRequestData = require("./utils.js");

const tagsRouter = async (req, res) => {
  if (req.url == "/api/tags/raw" && req.method == "GET") {
    let data = await getRequestData(req);
    // console.log(tagsController.getAllRaw(data));
    res.end(JSON.stringify(tagsController.getAllRaw(), null, 5));
  } else if (req.url == "/api/tags" && req.method == "GET") {
    let data = await getRequestData(req);
    // console.log(tagsController.getAllObj(data));
    res.end(JSON.stringify(tagsController.getAllObj(data), null, 5));
  } else if (
    req.url.match(/\/api\/tags\/([0-9a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    let reqUrl = req.url;
    let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    // console.log(tagsController.getAllObj(data));
    res.end(JSON.stringify(tagsController.getSpecific(id), null, 5));
  } else if (req.url == "/api/tags" && req.method == "POST") {
    let data = await getRequestData(req);
    tagsController.addToArray(data);
  }
};
module.exports = tagsRouter;
