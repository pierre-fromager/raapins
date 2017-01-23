const serviceManager = require('./manager');

/**
 * serviceStat
 * 
 */
class serviceStat extends serviceManager {
    
    /**
     * constructor
     * 
     * @param {type} storage
     * @param {type} pK
     * @returns {nm$_rest.serviceStat}
     */
    constructor(storage, pK) {
        super(storage, pK);
        this.stat = {};
    }
    
    /**
     * svcCount
     * 
     * @param {function} callback
     * @param {array} params
     * @returns {nm$_rest.serviceStat}
     */
    svcCount(callback, params) {
        let counter = null;
        let entityName = (params.entityName || null);
        callback = (callback || this.noop);
        let collection = [];
        if (entityName && entityName != '*') {
            counter = this.setFilter(function( obj ) {
                return (obj.entityName == entityName);
            }).count();
            collection.push({ entityName : entityName, counter : counter});
        } else {
            collection = [];
            let uniqEntities = [...new Set(this.storage.map(item => item.entityName))];
            uniqEntities.shift();
            for (var i = 0; i < uniqEntities.length; i++) {
                counter = this.setFilter(function( obj ) {
                    return (obj.entityName == uniqEntities[i]);
                }).count();
                collection.push({ entityName : uniqEntities[i], counter : counter});
            }
            collection = (collection.length > 0) ? collection : null;
        }
        callback(collection);
        return(this);
    };
}

module.exports = serviceStat;