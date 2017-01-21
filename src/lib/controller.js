/**
 * Front controller
 */
const restService = require( './service.js');
const ctrlEmitter = require('events').EventEmitter;

const service = new restService();
const controller = new ctrlEmitter();

const qs = require('querystring');
const cors = require('./cors.js');

const hook = {};

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
    let action = null;
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    if (controller.hook) {
        action = controller.hook.action;
        controller.hook = null;
        return action;
    } else {
        action = ((controller.methods().indexOf(request.method.toLowerCase()) !== -1)) 
            ? 'svc' + capitalizeFirstLetter(request.method) 
            : null;
    }
    return action;
}

/**
 * getService
 * s
 * @param {string} service
 * @returns {undefined}
 */
controller.getService = (service) => {}

/**
 * setHook
 * 
 * @param {object} hook
 * @returns {undefined}
 */
controller.setHook = (hook) => { controller.hook = hook;}

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
 * sendSignal
 * 
 * @param {string} signal
 * @param {string} response
 * @returns {undefined}
 */
controller.sendSignal = (signal, response) => {
    controller.emit(signal, response);
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
    console.log('action');
    console.log(action);
    if(action && (router.match && router.match.length > 0)) {
        let apiArguments = [function (apiResponse) {
            if (apiResponse) {
                controller.sendSignal('data', apiResponse);
            } else {
                controller.sendSignal('error', '404');
            }
        }];
        let entityName = router.match[0];
        let id = (router.match[1]) 
            ? (!isNaN(parseInt(router.match[1])) ? router.match[1] : null) 
            : null;
        let params = {
            'entityName' : entityName
            , 'id' : id
            , 'payload' : payload
        };
        apiArguments.push(params);
        service[action].apply(service, apiArguments);
        return;
    } else {
        controller.sendSignal('error', '404');
    }
};

module.exports = controller;