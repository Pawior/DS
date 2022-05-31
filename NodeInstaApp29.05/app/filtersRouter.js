const filtersController = require("./filtersController");
const fs = require("fs");

const filtersRouter = async (req, res) => {
  if (req.url == "/api/filters" && req.method == "GET") {
    // let data = await getRequestData(req);
    // console.log(tagsController.getAllRaw(data));
    res.end(JSON.stringify(filtersController.getAll(), null, 5));
  } else if (
    req.url.match(/\/api\/filters\/metadata\/([0-9a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    let reqUrl = req.url;

    let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    // res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.setHeader("Content-Type", "application/json");
    let obj = await filtersController.getSpecific(id);
    console.log("obj: ", obj);
    res.end(JSON.stringify(obj), null, 5);
  } else if (req.url == "/api/filters" && req.method == "PATCH") {
    let data = await getRequestData(req);
    await filtersController.editSpecific(data);
    res.end("success");
  } else if (
    req.url.match(/\/api\/filters\/([0-9a-zA-Z]+)\/([0-9a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    let reqUrl = req.url;

    let imgName = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    let tempUrl = reqUrl.substring(0, reqUrl.lastIndexOf("/"));
    let folderName = tempUrl.substring(tempUrl.lastIndexOf("/") + 1);
    console.log(imgName);
    console.log(tempUrl);
    console.log(folderName);
    await filtersController.downloadSpecific(imgName, folderName);
    let fileToLoad = fs.readFileSync(
      "./app/upload/albumNr72/upload_8aa15899a34d6cb7a3b7090c88b86e12.jpg"
    );
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(fileToLoad, "binary");

    // res.setHeader("Content-Type", "image/jpg");
    // res.end(
    //   new Buffer(
    //     "<img src='" +
    //       "http://localhost:3000/upload/albumNr72/upload_8aa15899a34d6cb7a3b7090c88b86e12.jpg" +
    //       "'>"
    //   )
    // );
  }
};

module.exports = filtersRouter;
