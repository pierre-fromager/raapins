/**
 * Front controller
 */
const ctrlEmitter = require('events').EventEmitter;
const restService = require('./service.js');
const service = new restService();
const controller = new ctrlEmitter();

/**
 * params
 * 
 * @param {type} request
 * @returns {unresolved}
 */
controller.params = (request) => {
    return request.url.replace(new RegExp('^/|/$', 'g'), '').split('/');
}

/**
 * methods
 * 
 * @returns {Array}
 */
controller.methods = () => {
    return ['get', 'put', 'patch', 'delete', 'post'];
}

/**
 * headers
 * 
 * @returns {nm$_controller.controller.headers.controllerAnonym$1}
 */
controller.headers = () => {
    return {
        'Access-Control-Allow-Origin': '*' ,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials' : false,
        'Access-Control-Allow-Methods' : 'POST, GET, PUT, DELETE, PATCH',
        'Access-Control-Max-Age' : '3600', // 1 hour
        'Access-Control-Allow-Headers' : 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
        'Content-Type': 'application/json'
    }
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
 * handle
 * 
 * @param {type} request
 * @param {type} response
 * @param {type} payload
 * @returns {undefined}
 */
controller.handle = (request, response, payload) => {
    let restParams = controller.params(request);
    let action = controller.action(request);
    if(action && restParams) {
        let apiArguments = [function (apiResponse) {
            if (apiResponse) {
                controller.emit('data', apiResponse);
            } else {
                controller.emit('error', '404');
            }
        }];
        let params = {
            'entityName' : restParams[0]
            , 'id' : (restParams[1]) 
                ? (!isNaN(parseInt(restParams[1])) ? restParams[1] : null) 
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

module.exports = controller;