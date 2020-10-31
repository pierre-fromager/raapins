/**
 * serviceManager
 * 
 */
class serviceManager {

    /**
     * constructor
     * 
     * @param {Array} storage
     * @param {Int} pK
     * @returns {nm$_manager.serviceManager}
     */
    constructor(storage, pK) {
        this.storage = (storage) ? storage : [];
        this.pK = (pK) ? pK : 0;
        this.default_filter = (r) => true;
        this.filter = this.default_filter;
    }

    /**
     * noop
     * 
     */
    noop = () => { }

    /**
     * hydrate
     * 
     * @param {Object} object
     * @param {Array} params
     * @param {Array} merge
     * @returns {Object}
     */
    hydrate = (object, params, merge) => {
        const dK = 'data';
        object[dK] = (merge) ? (object[dK] || {}) : {};
        const iR = /^d+$/;
        const fR = /^[+-]?\d+(\.\d+)?$/;
        const k = Object.keys(params.payload);
        for (var i = 0, len = k.length; i < len; i++) {
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
    find = () => {
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
    count = () => {
        let results = this.find();
        let counter = (results) ? results.length : null;
        return counter;
    };

    /**
     * setFilter
     * 
     * @param {Function} filterCallback
     * @returns {nm$_manager}
     */
    setFilter = (filterCallback) => {
        this.filter = (filterCallback)
            ? filterCallback
            : this.default_filter;
        return this;
    }
}

module.exports = serviceManager;