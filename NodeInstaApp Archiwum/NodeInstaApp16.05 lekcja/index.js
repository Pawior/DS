const http = require('http');
const router = require("./app/router")



http
    .createServer((req, res) => router(req, res))
    .listen(3000, () => console.log("listen on 3000"))

const logger = require('tracer').colorConsole();

logger.log('hello');
logger.trace('hello');
logger.debug('hello');
logger.info('hello');
logger.warn('hello');
logger.error('hello');