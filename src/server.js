const config = require('./lib/config.js');
const http = require('http');
const server = http.createServer()
    .listen(config.server.port, config.server.address)
    .setTimeout(config.server.timeout);

const qs = require('querystring');
const controller = require('./lib/controller.js');

server.on('request', (req, res) => {
    
    let reqRawData = '';
    
    req.on('data', (rawData) => {
        reqRawData += rawData;
    });
        
    req.on('end', () => {
        
        controller.on('data', (data) => {
            res.writeHead(200, controller.headers());
            res.end(JSON.stringify(data));
        });

        controller.on('error', (errorType) => {
            res.writeHead(errorType, controller.headers());
            res.end();
        });
    
        controller.handle(req, res, qs.parse(reqRawData));
    });
});

process.setMaxListeners(config.process.maxlisteners);
console.log(config.getServerStartMessage());