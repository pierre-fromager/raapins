const profiler = require('./lib/profiler.js');
const config = require('./lib/config.js');
const color = require('./lib/color.js');
const dater = require('./lib/dater.js');
const http = require('http');
const server = http.createServer()
    .listen(config.server.port, config.server.address)
    .setTimeout(config.server.timeout);
const httpDebug = false;
const router = require('./lib/router.js');
const controller = require('./lib/controller.js');

controller.setMaxListeners(config.process.maxlisteners);
profiler.add('starting');

router.config({root : '/'});
let apiRegexp = /^api\/v1\/([a-zA-Z0-9_]*)/;
let apiRegexpId = /^api\/v1\/([a-zA-Z0-9_]*)\/(\d*)/;
router.add('GET', apiRegexpId, function () {
    console.log('API v1 GET with id', arguments);
    /*
    return {
        args : arguments
    }*/
}).add('GET', apiRegexp, function () {
    console.log('API v1 GET', arguments);
}).add('POST', apiRegexp, function () {
    console.log('API v1 POST', arguments);
}).add('PUT', apiRegexpId, function () {
    console.log('API v1 PUT with id', arguments);
}).add('PATCH', apiRegexpId, function () {
    console.log('API v1 PATCH with id', arguments);
}).add('DELETE', apiRegexpId, function () {
    console.log('API v1 DELETE with id', arguments);
});

server.on('request', (req, res) => {
    
    profiler.add('request');
    
    if (httpDebug) {
        server.getConnections(function(error, count) {
            let counter = color.get(' >' + count + '< ', color.codes.yellow, color.codes.blue);
            process.stdout.write(
                dater.getDateTime() + counter + 'requests ' + "\r"
            );
        });
    }

    let reqRawData = '';
    
    req.on('data', (rawData) => {
        profiler.add('requestdata');
        reqRawData += rawData;
    });
        
    req.on('end', () => {
        controller.listen(controller, router.check(req), res, reqRawData);
    });
});
var startMessage = color.get(
    config.getServerStartMessage()
    , color.codes.white
    , color.codes.black
);
console.log(startMessage);