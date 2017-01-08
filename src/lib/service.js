/**
 * service
 * 
 */
class service {
    
    /**
     * constructor
     * 
     * @param {type} storage
     * @param {type} pK
     * @returns {nm$_rest.service}
     */
    constructor(storage, pK) {
        this.storage = (storage) ? storage : {};
        this.pK = (pK) ? pK : 0;
    }
    
    /**
     * noop
     * 
     * @returns {undefined}
     */
    noop(){};
    
    /**
     * hydrate
     * 
     * @param {type} object
     * @param {type} data
     * @returns {Object}
     */
    hydrate(object, params) {
        object['data'] = {};
        let iR = /^d+$/;
        let fR = /^[+-]?\d+(\.\d+)?$/;
        var k = Object.keys(params.payload);
        for(var i=0, len = k.length; i<len; i++){
            var v = params.payload[k[i]];
            v = (iR.test(v)) ? parseInt(v) : v;
            v = (fR.test(v)) ? parseFloat(v) : v;
            object['data'][k[i]] = v;
        }
        return object;
    }
    
    /**
     * svcPost
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPost(callback, params) {
        callback = (callback || noop);
        let entity = {
            id: ++this.pK,
            entityName: params.entityName
        };
        this.storage[ entity.id ] = (params) 
            ? this.hydrate(entity, params) 
            : entity;
        callback(entity);
        return(this);
    }
    
    /**
     * svcDelete
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcDelete(callback, params) {
        let id = (params.id || null);
        callback = (callback || noop);
        let svcity = (this.storage[ id ] || null);
        if (id) {
            delete this.storage[ id ];
        }
        callback(svcity);
        return(this);
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
        callback = (callback || noop);
        let collection = [];
        if (id) {
            collection = this.storage[ id ];
        } else {
            for (var i = 1; i <= this.pK; i++) {
                if (this.storage[ i ]) {
                    if (this.storage[i]['entityName'] == entityName)
                        collection.push(this.storage[ i ]);
                }
            }
        }
        callback(collection);
        return(this);
    };
    
    /**
     * svcPut
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPut(callback, params) {
        let id = (params.id || null);
        callback = (callback || noop);
        let collection = [];
        if (id) {
            collection = this.storage[ id ];
        } else {
            for (var i = 1; i <= this.pK; i++) {
                if (this.storage[ i ]) {
                    collection.push(this.storage[ i ]);
                }
            }
        }
        callback(collection);
        return(this);
    };
    
    /**
     * svcPatch
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.service}
     */
    svcPatch(callback, params) {
        let id = (params.id || null);
        callback = (callback || noop);
        let collection = [];
        if (id) {
            collection = this.storage[ id ];
        } else {
            for (var i = 1; i <= this.pK; i++) {
                if (this.storage[ i ]) {
                    collection.push(this.storage[ i ]);
                }
            }
        }
        callback(collection);
        return(this);
    };
}

module.exports = service;