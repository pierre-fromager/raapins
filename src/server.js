const config = require('./lib/config.js');
const http = require('http');
const server = http.createServer()
    .listen(config.server.port, config.server.address)
    .setTimeout(config.server.timeout);
const qs = require('querystring');
const controller = require('./lib/controller.js');
const cors = require('./lib/cors.js');

server.on('request', (req, res) => {
    
    let reqRawData = '';
    
    req.on('data', (rawData) => {
        reqRawData += rawData;
    });
        
    req.on('end', () => {
        
        controller.on('data', (data) => {
            res.writeHead(200, cors.getHeaders());
            res.end(JSON.stringify(data));
        });

        controller.on('error', (errorType) => {
            res.writeHead(errorType, cors.getHeaders());
            res.end();
        });
    
        controller.handle(req, res, qs.parse(reqRawData));
    });
});

process.setMaxListeners(config.process.maxlisteners);
console.log(config.getServerStartMessage());