const serviceManager = require('./service/manager');

/**
 * service
 * 
 */
class service extends serviceManager {
    
    /**
     * constructor
     * 
     * @param {type} storage
     * @param {type} pK
     * @returns {nm$_rest.service}
     */
    constructor(storage, pK) {
        super(storage, pK);
    }
    
    /**
     * svcGet
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcGet(callback, params) {
        let id = (params.id || null);
        let entityName = (params.entityName || null);
        callback = (callback || this.noop);
        let collection = null;
        if (id) {
            collection = this.storage[id];
        } else {
            collection = [];
            for (var i = 1; i <= this.pK; i++) {
                if (this.storage[ i ]) {
                    if (this.storage[i]['entityName'] == entityName)
                        collection.push(this.storage[i]);
                }
            }
            collection = (collection.length > 0) ? collection : null;
        }
        callback(collection);
        return(this);
    };
    
    /**
     * svcPost
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPost(callback, params) {
        callback = (callback || this.noop);
        let entity = {
            id: ++this.pK,
            entityName: params.entityName
        };
        this.storage[ entity.id ] = (params) 
            ? this.hydrate(entity, params, true) 
            : entity;
        callback(entity);
        return(this);
    }
    
    /**
     * svcDelete
     * 
     * delete existing data
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcDelete(callback, params) {
        let id = (params.id || null);
        callback = (callback || this.noop);
        let svcity = (this.storage[id] || null);
        if (id && this.storage[id]) {
            delete this.storage[id];
        }
        callback(svcity);
        return(this);
    }
    
    /**
     * svcPut
     * 
     * totaly rewite existing data
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPut(callback, params) {
        let id = (params.id || null);
        callback = (callback || this.noop);
        let collection = null;
        if (id && this.storage[id]) {
            collection = this.hydrate(this.storage[id], params, false);
        }
        callback(collection);
        return(this);
    };
    
    /**
     * svcPatch
     * 
     * update existing data
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPatch(callback, params) {
        let id = (params.id || null);
        callback = (callback || this.noop);
        let collection = null;
        if (id && this.storage[id]) {
            collection = this.hydrate(this.storage[id], params, true);
        }
        callback(collection);
        return(this);
    };
}

module.exports = service;