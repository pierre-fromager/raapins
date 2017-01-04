/**
 * Front controller
 */
const restService = require( './service.js');
const ctrlEmitter = require('events').EventEmitter;

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