const config = require('./lib/config.js');
const http = require('http');
const server = http.createServer()
    .listen(config.server.port, config.server.address)
    .setTimeout(config.server.timeout);
    
const qs = require('querystring');
const cors = require('./lib/cors.js');
const controller = require('./lib/controller.js');
controller.setMaxListeners(config.process.maxlisteners);

server.on('request', (req, res) => {
    
    server.getConnections(function(error, count) {
        console.log('connection count : ' + count);
    });
    
    let reqRawData = '';
    
    req.on('data', (rawData) => {
        reqRawData += rawData;
    });
        
    req.on('end', () => {
        
        controller.once('data', (data) => {
            res.writeHead(200, cors.getHeaders());
            res.end(JSON.stringify(data));
        });

        controller.once('error', (errorType) => {
            res.writeHead(errorType, cors.getHeaders());
            res.end();
        });
    
        controller.handle(req, res, qs.parse(reqRawData));
    });
});

console.log(config.getServerStartMessage());