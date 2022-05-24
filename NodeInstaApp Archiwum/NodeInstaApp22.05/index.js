const http = require('http');
const PORT = 3000;
const imageRouter = require("./app/imageRouter")
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

}).listen(PORT, () => console.log("listen on 3000"))

const logger = require('tracer').colorConsole();

logger.log('hello');
logger.trace('hello');
logger.debug('hello');
logger.info('hello');
logger.warn('hello');
logger.error('hello');