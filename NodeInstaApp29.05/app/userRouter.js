const userController = require("./userController");
const getRequestData = require("./utils.js");

const userRouter = async (req, res) => {
  if (req.url == "/api/user" && req.method == "GET") {
    let data = await getRequestData(req);
    // console.log(tagsController.getAllRaw(data));
    res.end(JSON.stringify(userController.getAll(), null, 5));
  } else if (
    req.url.match(/\/api\/user\/confirm\/([0-9a-zA-Z]+)/) &&
    req.method == "GET"
  ) {
    let reqUrl = req.url;
    let token = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
    // console.log(tagsController.getAllObj(data));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(userController.confirmAccount(token), null, 5));
  } else if (req.url == "/api/user/login" && req.method == "POST") {
    let data = await getRequestData(req);
    // console.log(tagsController.getAllObj(data));
    let token = await userController.loginUser(data);
    // res.send(JSON.stringify(userController.loginUser(data), null, 5));
    if (token == null) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify("Logowanie nieudane", null, 5));
    } else {
      res.setHeader("Authorization", "Bearer " + token);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify("Zalogowano pomyślnie", null, 5));
    }
  } else if (req.url == "/api/user/register" && req.method == "POST") {
    let data = await getRequestData(req);
    res.writeHead(201, { "Content-Type": "application/json" });
    userController.registerUser(data);
    res.end(JSON.stringify("Zajerestrowano", null, 5));
  }
};
module.exports = userRouter;
