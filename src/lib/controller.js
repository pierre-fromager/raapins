/**
 * controller
 * 
 * is a front rest controller
 */

import restService from './service/rest.js'
import { EventEmitter } from 'events'
import querystring from 'querystring'
import { Cors } from './cors.js';

const corsInstance = new Cors();
const controller = new EventEmitter();
const service = new restService();
const qs = querystring;
const hook = {};

const ctrlEnum = {
    error: 'error',
    data: 'data',
    action: {
        prefix: 'svc'
    },
    http: {
        request: {
            verbs: ['get', 'put', 'patch', 'delete', 'post']
        },
        response: {
            code: {
                error: '404'
            }
        }
    },
    handler: {
        api: {
            args: {
                entityName: 'entityName',
                id: 'id',
                payload: 'payload'
            }
        }
    }
}

/**
 * methods
 * 
 * @returns {Array}
 */
controller.methods = () => ctrlEnum.http.request.verbs

/**
 * action
 * 
 * @param {http.request} request
 * @returns {String}
 */
controller.action = (request) => {
    let action = null;
    const capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    if (controller.hook) {
        action = controller.hook.action;
        return action;
    } else {
        action = ((controller.methods().indexOf(request.method.toLowerCase()) !== -1))
            ? ctrlEnum.action.prefix + capitalizeFirstLetter(request.method)
            : null;
    }
    return action;
}

/**
 * getService
 * 
 * @param {String} service
 * @returns {undefined}
 */
controller.getService = (service) => { }

/**
 * setHook
 * 
 * @param {Object} hook
 * @returns {undefined}
 */
controller.setHook = (hook) => controller.hook = hook


/**
 * isHooked
 * 
 * @returns {Boolean}
 */
controller.isHooked = () => controller.hook != null

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

    controllerInstance.once(ctrlEnum.data, (data) => {
        res.writeHead(200, corsInstance.getHeaders());
        res.end(JSON.stringify(data));
    });

    controllerInstance.once(ctrlEnum.error, (errorType) => {
        res.writeHead(errorType, corsInstance.getHeaders());
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
controller.handle = (router, payload) => {
    const action = controller.action(router.req);
    if (action && (router.match && router.match.length > 0)) {
        let apiArguments = [(apiResponse) => {
            if (apiResponse) {
                controller.sendSignal(ctrlEnum.data, apiResponse);
            } else {
                controller.sendSignal(ctrlEnum.error, ctrlEnum.http.response.code.error);
            }
        }];
        const entityName = (controller.isHooked())
            ? controller.hook.params.entityName
            : router.match[0];
        const id = (router.match[1])
            ? (!isNaN(parseInt(router.match[1])) ? router.match[1] : null)
            : null;
        apiArguments.push({ entityName, id, payload });
        service[action].apply(service, apiArguments);
        controller.setHook(null);
        return;
    } else {
        controller.sendSignal(ctrlEnum.error, ctrlEnum.http.response.code.error);
    }
};

export default controller;