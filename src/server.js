const http = require('http');
const server = http.createServer().listen(8080, '127.0.0.1').setTimeout(500);
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
process.setMaxListeners(1000);
console.log('Server is running on 8080');