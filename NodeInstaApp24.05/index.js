const http = require('http');
const PORT = 3000;
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const userRouter = require("./app/userRouter")
require('dotenv').config();


http.createServer(async (req, res) => {

    //images

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }

    //tags

    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }

    else if (req.url.search("/api/user") != -1) {
        await userRouter(req, res)
    }

}).listen(process.env.APP_PORT, () => console.log(`listen on ${process.env.APP_PORT}`))

const logger = require('tracer').colorConsole();

logger.log('hello');
logger.trace('hello');
logger.debug('hello');
logger.info('hello');
logger.warn('hello');
logger.error('hello');