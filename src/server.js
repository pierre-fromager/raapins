const profiler = require('./lib/profiler.js');
const config = require('./lib/config.js');
const color = require('./lib/color.js');
const dater = require('./lib/dater.js');
const http = require('http');
const server = http.createServer()
    .listen(config.server.port, config.server.address)
    .setTimeout(config.server.timeout);
    
const qs = require('querystring');
const cors = require('./lib/cors.js');
const controller = require('./lib/controller.js');
controller.setMaxListeners(config.process.maxlisteners);
profiler.add('starting');

server.on('request', (req, res) => {
    
    profiler.add('request');
    
    server.getConnections(function(error, count) {
        let counter = color.get(' >' + count + '< ', color.codes.yellow, color.codes.blue);
        process.stdout.write(
            dater.getDateTime() + counter + 'requests ' + "\r"
        );
    });
    
    let reqRawData = '';
    
    req.on('data', (rawData) => {
        profiler.add('requestdata');
        reqRawData += rawData;
    });
        
    req.on('end', () => {
        profiler.add('requestend');
        controller.once('data', (data) => {
            res.writeHead(200, cors.getHeaders());
            res.end(JSON.stringify(data));
        });

        controller.once('error', (errorType) => {
            res.writeHead(errorType, cors.getHeaders());
            res.end();
        });
    
        controller.handle(req, res, qs.parse(reqRawData));
        profiler.add('requestendfinished');
    });
});
var startMessage = color.get(
    config.getServerStartMessage()
    , color.codes.white
    , color.codes.black
);
console.log(startMessage);