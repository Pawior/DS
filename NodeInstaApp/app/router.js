const http = require('http');
const imageRouter = require("./app/imageRouter.js")
const tagsRouter = require("./app/tagsRouter")


http.createServer(async (req, res) => {

    //images

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }

    //tags

    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }

})
    .listen(PORT, () => console.log("listen on 3000"))