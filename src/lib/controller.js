/**
 * Front controller
 */
const restService = require( './service.js');
const ctrlEmitter = require('events').EventEmitter;

const service = new restService();
const controller = new ctrlEmitter();

const qs = require('querystring');
const cors = require('./cors.js');

/**
 * methods
 * 
 * @returns {Array}
 */
controller.methods = () => {
    return ['get', 'put', 'patch', 'delete', 'post'];
}

/**
 * action
 * 
 * @param {type} request
 * @returns {String}
 */
controller.action = (request) => {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return ((controller.methods().indexOf(request.method.toLowerCase()) !== -1)) 
        ? 'svc' + capitalizeFirstLetter(request.method) 
        : null;
}

/**
 * listen
 * 
 * @param {controller} controllerInstance
 * @param {router} router
 * @param {http.response} res
 * @param {string} reqRawData
 * @returns {undefined}
 */
controller.listen = (controllerInstance, router, res, reqRawData) => {
    
    controllerInstance.once('data', (data) => {
        res.writeHead(200, cors.getHeaders());
        res.end(JSON.stringify(data));
    });

    controllerInstance.once('error', (errorType) => {
        res.writeHead(errorType, cors.getHeaders());
        res.end();
    });

    controllerInstance.handle(router, qs.parse(reqRawData));
}

/**
 * handle
 * 
 * @param {router} router
 * @param {array} payload
 * @returns {undefined}
 */
controller.handle = (router, payload ) => {
    let action = controller.action(router.req);
    if(action && (router.match.length > 0)) {
        let apiArguments = [function (apiResponse) {
            if (apiResponse) {
                controller.emit('data', apiResponse);
            } else {
                controller.emit('error', '404');
            }
        }];
        let params = {
            'entityName' : router.match[0]
            , 'id' : (router.match[1]) 
                ? (!isNaN(parseInt(router.match[1])) ? router.match[1] : null) 
                : null
            , 'payload' : payload
        };
        apiArguments.push(params);
        service[action].apply(service, apiArguments);
        return;
    } else {
        controller.emit('error', '404');
    }
    controller.emit('error', '500');
};

controller.run = (service, action, args) => {
    service[action].apply(service, args);
}

module.exports = controller;