/**
 * serviceManager
 * 
 */
class serviceManager {
    
    
    /**
     * constructor
     * 
     * @param {type} storage
     * @param {type} pK
     * @returns {nm$_rest.service}
     */
    constructor(storage, pK) {
        this.storage = (storage) ? storage : [];
        this.pK = (pK) ? pK : 0;
        this.default_filter = function (r) {return true;};
        this.filter = this.default_filter;
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
    hydrate(object, params, merge) {
        let dK = 'data';
        object[dK] = (merge) ? (object[dK] || {}) : {};
        let iR = /^d+$/;
        let fR = /^[+-]?\d+(\.\d+)?$/;
        var k = Object.keys(params.payload);
        for(var i=0, len = k.length; i<len; i++){
            var v = params.payload[k[i]];
            v = (iR.test(v)) ? parseInt(v) : v;
            v = (fR.test(v)) ? parseFloat(v) : v;
            object[dK][k[i]] = v;
        }
        return object;
    }
    
    /**
     * find
     * 
     * @returns {Array}
     */
    find(){
        let results = [];
        results = this.storage.filter(this.filter);
        results = (results.length > 0) ? results : null;
        return results;
    };
    
    /**
     * count
     * 
     * @returns {Array}
     */
    count(){
        let results = [];
        results = this.storage.filter(this.filter);
        results = (results.length > 0) ? results : null;
        return results;
    };
    
    /**
     * setFilter
     * 
     * @param {Function} filterCallback
     * @returns {Orm}
     */
    setFilter(filterCallback) {
        this.filter = (filterCallback) 
            ? filterCallback 
            : this.default_filter;
        return this;
    }
}

module.exports = serviceManager;