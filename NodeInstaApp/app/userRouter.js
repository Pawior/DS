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
    res.end(JSON.stringify(userController.confirmAccount(token), null, 5));
  } else if (req.url == "/api/user/login" && req.method == "POST") {
    let data = await getRequestData(req);
    // console.log(tagsController.getAllObj(data));
    res.end(JSON.stringify(userController.loginUser(data), null, 5));
  } else if (req.url == "/api/user/register" && req.method == "POST") {
    let data = await getRequestData(req);
    userController.registerUser(data);
  }
};
module.exports = userRouter;
