const libPath = './lib/';
const profiler = require(libPath + 'profiler.js');
const config = require(libPath + 'config.js');
const color = require(libPath + 'color.js');
const dater = require(libPath + 'dater.js');
const http = require('http');
const server = http.createServer()
    .listen(config.server.port, config.server.address)
    .setTimeout(config.server.timeout);
const router = require(libPath + 'router.js');
const controller = require(libPath + 'controller.js');

controller.setMaxListeners(config.process.maxlisteners);
profiler.add('starting');

router.config({root : '/'});

let statGlob = /^(stat)$/;
let statEnt = /^(stat)\/([a-zA-Z0-9_]{1,10})/;
let apiRegexp = /^api\/v1\/([a-zA-Z0-9_]{1,10})/;
let apiRegexpId = /^api\/v1\/([a-zA-Z0-9_]{1,10})\/(\d*)/;

router.add('GET', statEnt, function () {
    controller.setHook(
        {
            service : 'service',
            action: 'svcCount',
            params: {
                entityName :arguments[1] ,
                id : ''
            }
        }
    );
})
.add('GET', statGlob, function () {
    controller.setHook(
        {
            service: 'service',
            action: 'svcCount',
            params: {
                entityName: '*' ,
                id: ''
            }
        }
    );
})
.add('GET', apiRegexpId, function () {})
.add('GET', apiRegexp, function () {})
.add('POST', apiRegexp, function () {})
.add('PUT', apiRegexpId, function () {})
.add('PATCH', apiRegexpId, function () {})
.add('DELETE', apiRegexpId, function () {});

server.on('request', (req, res) => {
    
    profiler.add('request');
    
    if (config.server.debug) {
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